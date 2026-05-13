'use strict';

// Converters: MDX/JSX -> Markdown.
//
// Each `convert*` function takes a string of MDX/HTML and returns a string with
// the matching component(s) replaced by readable markdown. Converters that need
// data resolution take a `(content, siteDir)` signature and a `getDataJson`
// loader is injected from the host plugin.
//
// Kept as pure regex/string functions so they can be unit-tested without
// pulling in Docusaurus or fs.

// ----- helpers ----------------------------------------------------------

function getAttr(attrs, name) {
    if (!attrs) return null;
    const re = new RegExp(`${name}=["']([^"']*)["']`);
    const m = attrs.match(re);
    return m ? m[1] : null;
}

// Find the index of the closing brace that matches the opening brace at
// `openIdx`. Respects nested braces and `'`/`"`/`` ` `` string literals.
// Returns -1 if not found.
function findMatchingBrace(str, openIdx) {
    if (str[openIdx] !== '{') return -1;
    let depth = 0;
    let inString = null; // ', ", `, or null
    for (let i = openIdx; i < str.length; i++) {
        const ch = str[i];
        const prev = i > 0 ? str[i - 1] : '';
        if (inString) {
            if (ch === inString && prev !== '\\') inString = null;
            continue;
        }
        if (ch === "'" || ch === '"' || ch === '`') {
            inString = ch;
            continue;
        }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) return i;
        }
    }
    return -1;
}

// Walk a JSX-array literal body (without the wrapping [ ]) and yield each
// top-level object item as a raw string. Strips outer { }.
function splitTopLevelObjects(arrayBody) {
    const items = [];
    let i = 0;
    while (i < arrayBody.length) {
        while (i < arrayBody.length && arrayBody[i] !== '{') i++;
        if (i >= arrayBody.length) break;
        const close = findMatchingBrace(arrayBody, i);
        if (close === -1) break;
        items.push(arrayBody.slice(i + 1, close));
        i = close + 1;
    }
    return items;
}

// ----- existing converters (kept here so tests can import them too) -----

function convertTabsToMarkdown(content) {
    const tabsPattern = /<Tabs[^>]*>([\s\S]*?)<\/Tabs>/g;
    return content.replace(tabsPattern, (_, tabsContent) => {
        const tabItemPattern = /<TabItem\s+[^>]*value="([^"]*)"[^>]*label="([^"]*)"[^>]*>([\s\S]*?)<\/TabItem>/g;
        const result = [];
        let match;
        while ((match = tabItemPattern.exec(tabsContent)) !== null) {
            const [, , label, itemContent] = match;
            const cleanContent = itemContent
                .split('\n')
                .map(line => line.replace(/^\s{4}/, ''))
                .join('\n')
                .trim();
            result.push(`**${label}:**\n\n${cleanContent}`);
        }
        return result.join('\n\n---\n\n');
    });
}

function convertDetailsToMarkdown(content) {
    const detailsPattern = /<details>\s*<summary>(<strong>)?([^<]+)(<\/strong>)?<\/summary>([\s\S]*?)<\/details>/g;
    return content.replace(detailsPattern, (_, __, summaryText, ___, detailsContent) => {
        const cleanContent = detailsContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n')
            .trim();
        return `### ${summaryText.trim()}\n\n${cleanContent}`;
    });
}

function convertFAQToMarkdown(content) {
    content = content.replace(
        /<FAQItem\s+question="([^"]+)"\s*>([\s\S]*?)<\/FAQItem>/g,
        (_, question, answer) => `**Question: ${question}**\n\n${answer.trim()}\n`
    );
    content = content.replace(/<FAQ>([\s\S]*?)<\/FAQ>/g, (_, c) => c);
    return content;
}

// ----- new converters ---------------------------------------------------

// Map Note `type` -> Docusaurus admonition keyword.
const NOTE_TYPE_TO_ADMONITION = {
    tip: 'tip',
    success: 'tip',
    check: 'tip',
    warning: 'warning',
    error: 'danger',
    default: 'note',
};

function convertNoteToMarkdown(content) {
    return content.replace(
        /<Note(\s+[^>]*)?>([\s\S]*?)<\/Note>/g,
        (_, attrs, body) => {
            const type = getAttr(attrs, 'type') || 'default';
            const title = getAttr(attrs, 'title');
            const admonition = NOTE_TYPE_TO_ADMONITION[type] || 'note';
            const trimmedBody = body.trim();
            const titlePart = title ? `[${title}]` : '';
            return `\n:::${admonition}${titlePart}\n\n${trimmedBody}\n\n:::\n`;
        }
    );
}

// Convert <AsciiGraph>{`...`}<span>{`...`}</span>{`...`}</AsciiGraph> blocks
// to fenced code blocks. The component renders a <pre>; in markdown that's a
// triple-backtick block. Strips inline span highlights (text preserved).
function convertAsciiGraphToMarkdown(content) {
    return content.replace(
        /<AsciiGraph(\s+[^>]*)?>([\s\S]*?)<\/AsciiGraph>/g,
        (_, _attrs, body) => {
            // Strip span wrappers (keep their inner text)
            let stripped = body
                .replace(/<span\b[^>]*>/g, '')
                .replace(/<\/span>/g, '');
            // Unwrap JSX template literals: {`text`} -> text. The text inside
            // backticks can span newlines but cannot contain a backtick.
            stripped = stripped.replace(/\{`([^`]*)`\}/g, '$1');
            // Drop any remaining `{` / `}` artifacts at boundaries that aren't
            // followed by template literal content (defensive — shouldn't fire
            // on well-formed input).
            stripped = stripped.replace(/^\s*\n+|\n+\s*$/g, '');
            return `\n\`\`\`text\n${stripped}\n\`\`\`\n`;
        }
    );
}

// Find each <DocCardList ... items={[...]} ... /> (or with explicit close)
// and replace with a markdown bullet list. Uses brace-balanced scanning so
// that `]` characters inside the items array (e.g. Icons['rocket-launch'])
// don't terminate the match early.
function convertDocCardListToMarkdown(content) {
    const TAG = '<DocCardList';
    const out = [];
    let cursor = 0;

    while (cursor < content.length) {
        const start = content.indexOf(TAG, cursor);
        if (start === -1) {
            out.push(content.slice(cursor));
            break;
        }
        out.push(content.slice(cursor, start));

        // Find items={...} within the tag's open marker. Scan forward until
        // we hit `/>` or `>` at depth 0 (outside string/braces).
        const itemsKeyIdx = content.indexOf('items={', start);
        if (itemsKeyIdx === -1) {
            // Malformed tag — drop the literal `<DocCardList` to avoid infinite loop.
            cursor = start + TAG.length;
            continue;
        }
        const braceOpen = itemsKeyIdx + 'items='.length;
        const braceClose = findMatchingBrace(content, braceOpen);
        if (braceClose === -1) {
            cursor = start + TAG.length;
            continue;
        }
        // Find tag close (`/>` or `>` followed by `</DocCardList>`)
        let i = braceClose + 1;
        while (i < content.length && content[i] !== '>') i++;
        let tagEnd;
        if (i >= content.length) {
            tagEnd = content.length;
        } else if (content[i - 1] === '/') {
            tagEnd = i + 1;
        } else {
            const closeTag = content.indexOf('</DocCardList>', i);
            tagEnd = closeTag !== -1 ? closeTag + '</DocCardList>'.length : i + 1;
        }

        const itemsLiteral = content.slice(braceOpen + 1, braceClose).trim();
        const arrayBody = itemsLiteral.startsWith('[') && itemsLiteral.endsWith(']')
            ? itemsLiteral.slice(1, -1)
            : itemsLiteral;

        const items = splitTopLevelObjects(arrayBody);
        const lines = items
            .map((item) => {
                const href = getAttr(item, 'href') || extractObjectField(item, 'href');
                const label = getAttr(item, 'label') || extractObjectField(item, 'label');
                const description = extractObjectField(item, 'description');
                if (!href || !label) return null;
                return description
                    ? `- [${label}](${href}) — ${description}`
                    : `- [${label}](${href})`;
            })
            .filter(Boolean);

        out.push(lines.length ? `\n${lines.join('\n')}\n` : '');
        cursor = tagEnd;
    }

    return out.join('');
}

// Extract `field: 'value'` or `field: "value"` from an object-literal body.
function extractObjectField(objBody, field) {
    const re = new RegExp(`\\b${field}\\s*:\\s*['"]([^'"]+)['"]`);
    const m = objBody.match(re);
    return m ? m[1] : null;
}

// Convert <Badge type="..." /> (and optionally text="..." for custom) to an
// inline italic label like *[Required]*.
const BADGE_TYPE_LABELS = {
    optional: 'Optional',
    required: 'Required',
    'required-some': 'Required for some runtimes',
};
function convertBadgeToMarkdown(content) {
    return content.replace(
        /<Badge(\s+[^>]*?)?\s*\/>/g,
        (_, attrs) => {
            const type = getAttr(attrs, 'type') || 'optional';
            const text = getAttr(attrs, 'text');
            let label;
            if (type === 'custom') label = text || '';
            else label = BADGE_TYPE_LABELS[type] || text || '';
            return label ? `*[${label}]*` : '';
        }
    );
}

// Unwrap <Button>…</Button> — leave inner content for downstream converters
// (typically a <Link>).
function convertButtonToMarkdown(content) {
    return content.replace(/<Button(\s+[^>]*)?>([\s\S]*?)<\/Button>/g, '$2');
}

// <Link href="x">text</Link> -> [text](x)
function convertLinkToMarkdown(content) {
    return content.replace(
        /<Link(\s+[^>]*?)?>([\s\S]*?)<\/Link>/g,
        (match, attrs, children) => {
            const href = getAttr(attrs, 'href');
            if (!href) return children;
            const cleanText = children
                .replace(/<code>(.*?)<\/code>/g, '`$1`')
                .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
                .replace(/<em>(.*?)<\/em>/g, '*$1*')
                .replace(/<b>(.*?)<\/b>/g, '**$1**')
                .replace(/<[^>]+>/g, '')
                .trim();
            return `[${cleanText}](${href})`;
        }
    );
}

// <CustomCard title="X" emoji="🚀">body</CustomCard> -> ### 🚀 X\n\nbody
function convertCustomCardToMarkdown(content) {
    return content.replace(
        /<CustomCard(\s+[^>]*?)?>([\s\S]*?)<\/CustomCard>/g,
        (_, attrs, body) => {
            const title = getAttr(attrs, 'title') || '';
            const emoji = getAttr(attrs, 'emoji') || '';
            const header = emoji ? `${emoji} ${title}`.trim() : title;
            const trimmedBody = body.trim();
            return header
                ? `\n### ${header}\n\n${trimmedBody}\n`
                : `\n${trimmedBody}\n`;
        }
    );
}

// <DeployButton link="deno" /> -> markdown link to the recipe deploy URL.
function convertDeployButtonToMarkdown(content) {
    return content.replace(
        /<DeployButton(\s+[^>]*?)\s*\/>/g,
        (match, attrs) => {
            const link = getAttr(attrs, 'link');
            if (!link) return '';
            return `[Deploy "${link}" recipe on Zerops](https://app.zerops.io/recipe/?lf=${link})`;
        }
    );
}

// <Dropdown><DropdownItem title="X">body</DropdownItem>…</Dropdown>
// -> emit ### headers per item. We don't use <details> here because the
// existing convertDetailsToMarkdown would rewrite them inconsistently
// (it requires <strong> wrapping); a heading is the cleaner equivalent.
function convertDropdownToMarkdown(content) {
    // First, expand DropdownItem
    content = content.replace(
        /<DropdownItem(\s+[^>]*?)?>([\s\S]*?)<\/DropdownItem>/g,
        (_, attrs, body) => {
            const title = getAttr(attrs, 'title') || '';
            const trimmed = body.trim();
            return title
                ? `\n#### ${title}\n\n${trimmed}\n`
                : `\n${trimmed}\n`;
        }
    );
    // Then unwrap the Dropdown
    content = content.replace(/<Dropdown(?:\s+[^>]*)?>([\s\S]*?)<\/Dropdown>/g, '$1');
    return content;
}

// <Video src="/vids/x.webm" /> -> text link to the video file.
function convertVideoToMarkdown(content) {
    return content.replace(
        /<Video(\s+[^>]*?)\s*\/>/g,
        (_, attrs) => {
            const src = getAttr(attrs, 'src');
            return src ? `[Video: ${src}](${src})` : '';
        }
    );
}

// <CodingAgentsTopology /> -> render both Remote and Local modes as fenced
// code blocks, mirroring the toggle on the live page. Pulls the same build
// logic the React component uses via build.cjs.
function convertCodingAgentsTopologyToMarkdown(content) {
    if (!/<CodingAgentsTopology\s*\/>/.test(content)) return content;
    let build;
    let grid;
    try {
        // eslint-disable-next-line global-require
        build = require('../../components/CodingAgentsTopology/build.cjs');
        // eslint-disable-next-line global-require
        grid = require('../../components/CodingAgentsTopology/grid.cjs');
    } catch (e) {
        return content.replace(
            /<CodingAgentsTopology\s*\/>/g,
            '\n*See the live page for the interactive ZCP project topology diagram.*\n'
        );
    }
    const remote = grid.renderText(build.buildRemote());
    const local = grid.renderText(build.buildLocal());
    const block =
        '\n**Remote (zcp service)**\n\n```text\n' + remote + '\n```\n\n' +
        '**Local (zcli vpn up)**\n\n```text\n' + local + '\n```\n';
    return content.replace(/<CodingAgentsTopology\s*\/>/g, block);
}

// <IntroAgentVisual /> -> ASCII layout with the agent and recipe names laid
// out inside their boxes as text. The live page positions logo <img>
// elements absolutely at (col, row) slots designed for visual icons; in
// plain markdown those slots are too tight for text names (e.g. "Claude
// Code" + "Codex" would collide in the 14-cell agent box). Instead:
//   - Agents (4 items, narrow box): vertically stacked, 1 per row, centered
//   - Recipes (23 items, wide box): comma-wrapped at the box's inner width
// The boxes' outer geometry stays identical to the live page so the rest of
// the diagram (arrows, projects, services) lines up.
function convertIntroAgentVisualToMarkdown(content) {
    if (!/<IntroAgentVisual\s*\/>/.test(content)) return content;
    let build;
    let grid;
    try {
        // eslint-disable-next-line global-require
        build = require('../../components/IntroAgentVisual/build.cjs');
        // eslint-disable-next-line global-require
        grid = require('../../components/CodingAgentsTopology/grid.cjs');
    } catch (e) {
        return content.replace(
            /<IntroAgentVisual\s*\/>/g,
            '\n*See the live page for the visual map of supported coding agents and recipes.*\n'
        );
    }

    const { grid: g } = build.buildLayout();

    // Agent box geometry (from build.cjs: x=2, y=0, w=16, h=8, topLabel='ZCP MCP')
    const agentBoxCenter = 2 + Math.floor(16 / 2); // col 10
    const agentRowsStart = 2;
    build.AGENTS.forEach((a, i) => {
        const row = agentRowsStart + i; // rows 2, 3, 4, 5
        const startCol = agentBoxCenter - Math.floor(a.alt.length / 2);
        grid.text(g, startCol, row, a.alt);
    });

    // Recipe box geometry (from build.cjs: x=22, y=0, w=58, h=11)
    // Inner left col 24, inner width 54 chars, inner rows 1..9
    const recipeInnerLeft = 24;
    const recipeInnerWidth = 54;
    const recipeRows = [3, 5, 7]; // three evenly spaced rows inside the box
    const recipeLines = wrapCommaList(
        build.RECIPES.map((r) => r.alt),
        recipeInnerWidth,
        recipeRows.length
    );
    recipeLines.forEach((line, i) => {
        const row = recipeRows[i];
        // Center the line in the inner box for visual balance
        const startCol = recipeInnerLeft + Math.max(0, Math.floor((recipeInnerWidth - line.length) / 2));
        grid.text(g, startCol, row, line);
    });

    const ascii = grid.renderText(g);
    return content.replace(/<IntroAgentVisual\s*\/>/g, '\n```text\n' + ascii + '\n```\n');
}

// Wrap a list of names into up to `maxLines` comma-separated rows, each no
// wider than `width`. Greedily packs as many names per row as fit; if the
// list doesn't fit in `maxLines`, the last row ends with an ellipsis.
function wrapCommaList(items, width, maxLines) {
    const lines = [];
    let current = '';
    for (const item of items) {
        if (lines.length === maxLines) break;
        const sep = current ? ', ' : '';
        const candidate = current + sep + item;
        if (candidate.length <= width) {
            current = candidate;
            continue;
        }
        // Push current line, start a new one
        if (current) lines.push(current);
        if (lines.length === maxLines) break;
        current = item.length <= width ? item : item.slice(0, width);
    }
    if (current && lines.length < maxLines) lines.push(current);
    return lines;
}

// <section className="zcp-landscape-section"><header><h4/><div/><p.examples/></header><p>body</p></section>
// -> #### h4 / _examples_ / body
function convertSectionLandscapeToMarkdown(content) {
    return content.replace(
        /<section\s+className=["']zcp-landscape-section["']\s*>([\s\S]*?)<\/section>/g,
        (_, body) => {
            const h4Match = body.match(/<h4[^>]*>([\s\S]*?)<\/h4>/);
            const heading = h4Match ? h4Match[1].trim() : '';
            const examplesMatch = body.match(
                /<p\s+className=["']zcp-landscape-section__examples["']\s*>([\s\S]*?)<\/p>/
            );
            const examples = examplesMatch ? examplesMatch[1].trim() : '';
            const afterHeader = body.replace(/<header[\s\S]*?<\/header>/, '');
            const bodyParaMatch = afterHeader.match(/<p[^>]*>([\s\S]*?)<\/p>/);
            const bodyText = bodyParaMatch ? bodyParaMatch[1].trim() : '';

            let out = '';
            if (heading) out += `\n#### ${heading}\n`;
            if (examples) out += `\n_${examples}_\n`;
            if (bodyText) out += `\n${bodyText}\n`;
            return out;
        }
    );
}

// <ExpandableTable><table>...</table></ExpandableTable> -> just the table.
function convertExpandableTableToMarkdown(content) {
    return content.replace(
        /<ExpandableTable(?:\s+[^>]*)?>([\s\S]*?)<\/ExpandableTable>/g,
        '$1'
    );
}

// Standalone <UnorderedCodeList data={data.x.y} /> -> markdown bullet list of
// backticked items. `getData` is a `(siteDir) => object` loader.
function convertUnorderedCodeListStandalone(content, getData, siteDir) {
    return content.replace(
        /<UnorderedCodeList\s+data=\{([^}]+)\}\s*\/>/g,
        (match, dataPath) => {
            try {
                const data = getData(siteDir);
                const keys = dataPath.trim().replace(/^data\./, '').split('.');
                let val = data;
                for (const key of keys) {
                    if (val && typeof val === 'object' && key in val) val = val[key];
                    else return match;
                }
                if (Array.isArray(val)) {
                    return '\n' + val.map((item) => {
                        if (Array.isArray(item)) {
                            return `- ${item.map((s) => `\`${s}\``).join(', ')}`;
                        }
                        const commentMatch = String(item).match(/^(.+?)\s*\(([^()]+)\)\s*$/);
                        if (commentMatch) {
                            return `- \`${commentMatch[1].trim()}\` (${commentMatch[2].trim()})`;
                        }
                        return `- \`${item}\``;
                    }).join('\n') + '\n';
                }
                return `\`${val}\``;
            } catch (_) {
                return match;
            }
        }
    );
}

// Drop components that have no useful markdown representation (purely
// decorative / interactive without source content). Handles both self-closing
// and wrapping forms.
const SILENT_DROP_COMPONENTS = [
    'PricingCalculator',
    'BrandAssets',
    'BackgroundPattern',
    'ResourceTable',
    'TechCard',
    'GroupCards',
    'TabbedCodeBlocks',
    'ExpandableTable', // already converted to inner table above; this is a fallback
];
function dropSilentComponents(content, names = SILENT_DROP_COMPONENTS) {
    for (const name of names) {
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // wrapping form first (lazy)
        content = content.replace(
            new RegExp(`<${escaped}\\b[^>]*>[\\s\\S]*?<\\/${escaped}>`, 'g'),
            ''
        );
        // self-closing form. Use brace-aware skip for props that contain `{...}`
        content = stripSelfClosing(content, name);
    }
    return content;
}

// Remove `<Name ... />` instances where `...` may include JSX expression
// containers `{ ... }` with `>` inside (e.g. `items={[ ...arrow funcs > 0 ... ]}`).
function stripSelfClosing(content, name) {
    const TAG = `<${name}`;
    const out = [];
    let cursor = 0;
    while (cursor < content.length) {
        const start = content.indexOf(TAG, cursor);
        if (start === -1) {
            out.push(content.slice(cursor));
            break;
        }
        out.push(content.slice(cursor, start));
        // After `<Name`, must be a non-identifier character (whitespace, /, or >)
        // to avoid matching `<NameSomething`.
        const after = content[start + TAG.length];
        if (after && /[a-zA-Z0-9_]/.test(after)) {
            // Not a real match — emit and advance one char
            out.push(content[start]);
            cursor = start + 1;
            continue;
        }
        // Walk forward, respecting strings + braces, looking for `/>` or `>`.
        let i = start + TAG.length;
        let inString = null;
        let braceDepth = 0;
        let tagEnd = -1;
        let selfClosing = false;
        while (i < content.length) {
            const ch = content[i];
            const prev = i > 0 ? content[i - 1] : '';
            if (inString) {
                if (ch === inString && prev !== '\\') inString = null;
                i++;
                continue;
            }
            if (ch === "'" || ch === '"' || ch === '`') {
                inString = ch;
                i++;
                continue;
            }
            if (ch === '{') {
                braceDepth++;
                i++;
                continue;
            }
            if (ch === '}') {
                braceDepth--;
                i++;
                continue;
            }
            if (braceDepth === 0 && ch === '/' && content[i + 1] === '>') {
                tagEnd = i + 2;
                selfClosing = true;
                break;
            }
            if (braceDepth === 0 && ch === '>') {
                tagEnd = i + 1;
                break;
            }
            i++;
        }
        if (tagEnd === -1) {
            // Couldn't parse — emit and advance.
            out.push(content[start]);
            cursor = start + 1;
            continue;
        }
        if (selfClosing) {
            cursor = tagEnd;
        } else {
            // Drop matching close tag too if present
            const closeTag = `</${name}>`;
            const closeIdx = content.indexOf(closeTag, tagEnd);
            cursor = closeIdx !== -1 ? closeIdx + closeTag.length : tagEnd;
        }
    }
    return out.join('');
}

module.exports = {
    // helpers
    getAttr,
    findMatchingBrace,
    splitTopLevelObjects,
    stripSelfClosing,
    // pre-existing
    convertTabsToMarkdown,
    convertDetailsToMarkdown,
    convertFAQToMarkdown,
    // new
    convertNoteToMarkdown,
    convertAsciiGraphToMarkdown,
    convertDocCardListToMarkdown,
    convertBadgeToMarkdown,
    convertButtonToMarkdown,
    convertLinkToMarkdown,
    convertCustomCardToMarkdown,
    convertDeployButtonToMarkdown,
    convertDropdownToMarkdown,
    convertVideoToMarkdown,
    convertCodingAgentsTopologyToMarkdown,
    convertIntroAgentVisualToMarkdown,
    convertSectionLandscapeToMarkdown,
    convertExpandableTableToMarkdown,
    convertUnorderedCodeListStandalone,
    dropSilentComponents,
    NOTE_TYPE_TO_ADMONITION,
    BADGE_TYPE_LABELS,
    SILENT_DROP_COMPONENTS,
};
