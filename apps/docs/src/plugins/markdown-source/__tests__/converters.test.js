'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../converters');

// ---------- Note --------------------------------------------------------

test('convertNoteToMarkdown: tip with title -> :::tip[title]', () => {
    const input = '<Note type="tip" title="Hello World">Body text here</Note>';
    const out = C.convertNoteToMarkdown(input).trim();
    assert.equal(out, ':::tip[Hello World]\n\nBody text here\n\n:::');
});

test('convertNoteToMarkdown: warning without title -> :::warning', () => {
    const input = '<Note type="warning">Be careful</Note>';
    const out = C.convertNoteToMarkdown(input).trim();
    assert.equal(out, ':::warning\n\nBe careful\n\n:::');
});

test('convertNoteToMarkdown: error type -> :::danger', () => {
    const input = '<Note type="error">Something failed</Note>';
    const out = C.convertNoteToMarkdown(input).trim();
    assert.match(out, /^:::danger/);
});

test('convertNoteToMarkdown: success type -> :::tip', () => {
    const input = '<Note type="success">Worked</Note>';
    const out = C.convertNoteToMarkdown(input).trim();
    assert.match(out, /^:::tip/);
});

test('convertNoteToMarkdown: no type -> :::note', () => {
    const input = '<Note title="Heads up">Just a note</Note>';
    const out = C.convertNoteToMarkdown(input).trim();
    assert.equal(out, ':::note[Heads up]\n\nJust a note\n\n:::');
});

test('convertNoteToMarkdown: multi-line body with markdown preserved', () => {
    const input = `<Note type="tip" title="Multi">
Line one
**bold** here

Another paragraph with \`code\`.
</Note>`;
    const out = C.convertNoteToMarkdown(input);
    assert.match(out, /:::tip\[Multi\]/);
    assert.match(out, /Line one/);
    assert.match(out, /\*\*bold\*\* here/);
    assert.match(out, /Another paragraph with `code`\./);
    assert.match(out, /:::\n$/);
});

test('convertNoteToMarkdown: multiple Notes in one document', () => {
    const input = `<Note type="tip" title="A">first</Note>
some text
<Note type="warning">second</Note>`;
    const out = C.convertNoteToMarkdown(input);
    assert.match(out, /:::tip\[A\]/);
    assert.match(out, /:::warning/);
    assert.match(out, /some text/);
});

// ---------- AsciiGraph -------------------------------------------------

test('convertAsciiGraphToMarkdown: unwraps JSX template literals into code fence', () => {
    const input = '<AsciiGraph ariaLabel="x">{`hello world`}</AsciiGraph>';
    const out = C.convertAsciiGraphToMarkdown(input).trim();
    assert.equal(out, '```text\nhello world\n```');
});

test('convertAsciiGraphToMarkdown: strips inline span highlights', () => {
    const input = '<AsciiGraph>{`foo `}<span className="ascii-graph__highlight">{`HL`}</span>{` bar`}</AsciiGraph>';
    const out = C.convertAsciiGraphToMarkdown(input).trim();
    assert.equal(out, '```text\nfoo HL bar\n```');
});

test('convertAsciiGraphToMarkdown: preserves multi-line ASCII art', () => {
    const input = `<AsciiGraph ariaLabel="loop">{\`    \`}<span className="ascii-graph__highlight">{\`zcp\`}</span>{\`
             │
             ▼
    edit code\`}</AsciiGraph>`;
    const out = C.convertAsciiGraphToMarkdown(input);
    assert.match(out, /```text/);
    assert.match(out, /    zcp/);
    assert.match(out, /             │/);
    assert.match(out, /             ▼/);
    assert.match(out, /    edit code/);
    assert.doesNotMatch(out, /<span/);
    assert.doesNotMatch(out, /\{`/);
    assert.doesNotMatch(out, /`\}/);
});

test('convertAsciiGraphToMarkdown: handles ariaLabel attribute', () => {
    const input = '<AsciiGraph ariaLabel="Develop workflow loop">{`x`}</AsciiGraph>';
    const out = C.convertAsciiGraphToMarkdown(input);
    assert.doesNotMatch(out, /ariaLabel/);
});

test('convertAsciiGraphToMarkdown: handles two AsciiGraphs in same document', () => {
    const input = '<AsciiGraph>{`one`}</AsciiGraph>\nbetween\n<AsciiGraph>{`two`}</AsciiGraph>';
    const out = C.convertAsciiGraphToMarkdown(input);
    assert.match(out, /one/);
    assert.match(out, /between/);
    assert.match(out, /two/);
    assert.equal((out.match(/```text/g) || []).length, 2);
});

// ---------- DocCardList ------------------------------------------------

test('convertDocCardListToMarkdown: single self-closing item with description', () => {
    const input = `<DocCardList items={[
        { type: 'link', href: '/zcp/quickstart', label: 'Quickstart', customProps: { icon: Icons['rocket-launch'], description: 'AI Agent recipe and a real change in five minutes.' } },
    ]} />`;
    const out = C.convertDocCardListToMarkdown(input);
    assert.match(out, /- \[Quickstart\]\(\/zcp\/quickstart\) — AI Agent recipe and a real change in five minutes\./);
});

test('convertDocCardListToMarkdown: multiple items with Icons[...] inside', () => {
    const input = `<DocCardList items={[
        { type: 'link', href: '/a', label: 'A', customProps: { icon: Icons['rocket-launch'], description: 'desc A' } },
        { type: 'link', href: '/b', label: 'B', customProps: { icon: Icons['sparkles'], description: 'desc B' } },
        { type: 'link', href: '/c', label: 'C', customProps: { icon: Icons['globe-europe'], description: 'desc C' } },
    ]} />`;
    const out = C.convertDocCardListToMarkdown(input);
    assert.match(out, /- \[A\]\(\/a\) — desc A/);
    assert.match(out, /- \[B\]\(\/b\) — desc B/);
    assert.match(out, /- \[C\]\(\/c\) — desc C/);
});

test('convertDocCardListToMarkdown: item without description renders link only', () => {
    const input = `<DocCardList items={[{ type: 'link', href: '/x', label: 'X' }]} />`;
    const out = C.convertDocCardListToMarkdown(input);
    assert.match(out, /- \[X\]\(\/x\)\n/);
    assert.doesNotMatch(out, /—/);
});

test('convertDocCardListToMarkdown: surrounding text is preserved', () => {
    const input = `before
<DocCardList items={[{ href: '/x', label: 'X' }]} />
after`;
    const out = C.convertDocCardListToMarkdown(input);
    assert.match(out, /before/);
    assert.match(out, /after/);
    assert.match(out, /- \[X\]\(\/x\)/);
});

test('convertDocCardListToMarkdown: items with single-quoted strings containing ]', () => {
    // Critical regression test: `customProps: { icon: Icons['x'] }` contains `]`,
    // which would terminate a naive lazy regex match.
    const input = `<DocCardList items={[
        { type: 'link', href: '/p', label: 'P', customProps: { icon: Icons['close-bracket-test'], description: 'd' } }
    ]} />`;
    const out = C.convertDocCardListToMarkdown(input);
    assert.match(out, /- \[P\]\(\/p\) — d/);
});

// ---------- Badge ------------------------------------------------------

test('convertBadgeToMarkdown: optional -> *[Optional]*', () => {
    assert.equal(C.convertBadgeToMarkdown('<Badge type="optional" />'), '*[Optional]*');
});

test('convertBadgeToMarkdown: required -> *[Required]*', () => {
    assert.equal(C.convertBadgeToMarkdown('<Badge type="required" />'), '*[Required]*');
});

test('convertBadgeToMarkdown: required-some -> longer label', () => {
    assert.equal(
        C.convertBadgeToMarkdown('<Badge type="required-some"/>'),
        '*[Required for some runtimes]*'
    );
});

test('convertBadgeToMarkdown: custom with text', () => {
    assert.equal(
        C.convertBadgeToMarkdown('<Badge type="custom" text="Beta" />'),
        '*[Beta]*'
    );
});

test('convertBadgeToMarkdown: no attributes defaults to optional', () => {
    assert.equal(C.convertBadgeToMarkdown('<Badge />'), '*[Optional]*');
});

// ---------- Button -----------------------------------------------------

test('convertButtonToMarkdown: unwraps children', () => {
    const input = '<Button variant="secondary"><Link href="/x">click</Link></Button>';
    assert.equal(C.convertButtonToMarkdown(input), '<Link href="/x">click</Link>');
});

// ---------- Link -------------------------------------------------------

test('convertLinkToMarkdown: plain link', () => {
    assert.equal(
        C.convertLinkToMarkdown('<Link href="/features/infrastructure">Read more</Link>'),
        '[Read more](/features/infrastructure)'
    );
});

test('convertLinkToMarkdown: link with inline code', () => {
    assert.equal(
        C.convertLinkToMarkdown('<Link href="/x">use <code>zcli</code></Link>'),
        '[use `zcli`](/x)'
    );
});

test('convertLinkToMarkdown: no href returns children unchanged', () => {
    assert.equal(
        C.convertLinkToMarkdown('<Link>orphan</Link>'),
        'orphan'
    );
});

// ---------- CustomCard -------------------------------------------------

test('convertCustomCardToMarkdown: title + emoji -> ### emoji title', () => {
    const input = '<CustomCard title="No Fuss" emoji="🚀">body content</CustomCard>';
    const out = C.convertCustomCardToMarkdown(input).trim();
    assert.equal(out, '### 🚀 No Fuss\n\nbody content');
});

test('convertCustomCardToMarkdown: title only', () => {
    const input = '<CustomCard title="Just Title">stuff</CustomCard>';
    const out = C.convertCustomCardToMarkdown(input).trim();
    assert.equal(out, '### Just Title\n\nstuff');
});

// ---------- DeployButton -----------------------------------------------

test('convertDeployButtonToMarkdown: builds recipe URL', () => {
    assert.equal(
        C.convertDeployButtonToMarkdown('<DeployButton link="deno" badgeWidth="200" />'),
        '[Deploy "deno" recipe on Zerops](https://app.zerops.io/recipe/?lf=deno)'
    );
});

test('convertDeployButtonToMarkdown: missing link -> empty', () => {
    assert.equal(
        C.convertDeployButtonToMarkdown('<DeployButton badgeWidth="200" />'),
        ''
    );
});

// ---------- Dropdown ---------------------------------------------------

test('convertDropdownToMarkdown: single item -> #### heading + body', () => {
    const input = '<Dropdown><DropdownItem title="X">body here</DropdownItem></Dropdown>';
    const out = C.convertDropdownToMarkdown(input);
    assert.match(out, /#### X/);
    assert.match(out, /body here/);
});

test('convertDropdownToMarkdown: multiple items', () => {
    const input = `<Dropdown>
<DropdownItem title="One">first body</DropdownItem>
<DropdownItem title="Two">second body</DropdownItem>
</Dropdown>`;
    const out = C.convertDropdownToMarkdown(input);
    assert.match(out, /#### One/);
    assert.match(out, /first body/);
    assert.match(out, /#### Two/);
    assert.match(out, /second body/);
});

// ---------- Video ------------------------------------------------------

test('convertVideoToMarkdown: self-closing with src', () => {
    assert.equal(
        C.convertVideoToMarkdown('<Video src="/vids/golang.webm" type="video/webm" />'),
        '[Video: /vids/golang.webm](/vids/golang.webm)'
    );
});

test('convertVideoToMarkdown: no src -> empty', () => {
    assert.equal(C.convertVideoToMarkdown('<Video />'), '');
});

// ---------- CodingAgentsTopology ---------------------------------------

test('convertCodingAgentsTopologyToMarkdown: renders Remote + Local ASCII as code blocks', () => {
    const out = C.convertCodingAgentsTopologyToMarkdown('<CodingAgentsTopology />');
    // Both modes labelled
    assert.match(out, /\*\*Remote \(zcp service\)\*\*/);
    assert.match(out, /\*\*Local \(zcli vpn up\)\*\*/);
    // Two fenced code blocks
    assert.equal((out.match(/```text/g) || []).length, 2);
    // Recognizable structural strings from the diagram
    assert.match(out, /Zerops development project/);
    assert.match(out, /appdev:3000/);
    assert.match(out, /appstage:3000/);
    assert.match(out, /db:5432/);
    assert.match(out, /cache:6379/);
    assert.match(out, /zcp service/);
    assert.match(out, /VPN tunnel/);
    assert.match(out, /zcli vpn up/);
});

test('convertCodingAgentsTopologyToMarkdown: no-op when component not present', () => {
    assert.equal(C.convertCodingAgentsTopologyToMarkdown('plain text'), 'plain text');
});

test('convertIntroAgentVisualToMarkdown: agents stacked vertically in the box, recipes wrapped', () => {
    const out = C.convertIntroAgentVisualToMarkdown('<IntroAgentVisual />');
    // Structural ASCII present
    assert.match(out, /```text/);
    assert.match(out, /ZCP MCP/);
    assert.match(out, /recipes for any stack/);
    assert.match(out, /complex project/);
    assert.match(out, /simple project/);
    // All agent names land in the diagram
    assert.match(out, /Claude Code/);
    assert.match(out, /Codex/);
    assert.match(out, /Gemini CLI/);
    assert.match(out, /opencode/);
    // Recipes wrapped inside their box (commas indicate the wrapped-list form)
    assert.match(out, /Bun, Deno/);
    assert.match(out, /Laravel/);
    assert.match(out, /Next\.js/);
    assert.match(out, /Nest\.js/);
    // No leftover JSX, no leftover "Supported coding agents:" header
    // (replaced by in-box placement)
    assert.doesNotMatch(out, /<IntroAgentVisual/);
});

test('wrapCommaList helper: greedy line packing', () => {
    // Internal helper isn't directly exported; we test via the public converter
    // by checking that line lengths stay within bounds via the rendered ASCII.
    // This minimal smoke test ensures the converter renders without throwing
    // and stays under the box's inner width.
    const out = C.convertIntroAgentVisualToMarkdown('<IntroAgentVisual />');
    const fence = out.match(/```text\n([\s\S]*?)\n```/);
    assert.ok(fence, 'fenced ASCII block present');
    for (const line of fence[1].split('\n')) {
        // The grid is W=86 wide, so each rendered line cannot exceed 86 chars
        assert.ok(line.length <= 86, `line too wide: ${line.length}`);
    }
});

test('convertIntroAgentVisualToMarkdown: no-op when component not present', () => {
    assert.equal(C.convertIntroAgentVisualToMarkdown('plain text'), 'plain text');
});

// ---------- SectionLandscape -------------------------------------------

test('convertSectionLandscapeToMarkdown: extracts heading, examples, body', () => {
    const input = `<section className="zcp-landscape-section">
  <header>
    <h4>Local coding agents</h4>
    <div className="zcp-landscape-section__logos"></div>
    <p className="zcp-landscape-section__examples">Cursor · Zed · Aider</p>
  </header>
  <p>The agent runs on your machine.</p>
</section>`;
    const out = C.convertSectionLandscapeToMarkdown(input);
    assert.match(out, /#### Local coding agents/);
    assert.match(out, /_Cursor · Zed · Aider_/);
    assert.match(out, /The agent runs on your machine\./);
});

test('convertSectionLandscapeToMarkdown: leaves unrelated sections alone', () => {
    const input = '<section className="other-class"><h4>X</h4></section>';
    assert.equal(C.convertSectionLandscapeToMarkdown(input), input);
});

// ---------- ExpandableTable --------------------------------------------

test('convertExpandableTableToMarkdown: unwraps inner table', () => {
    const input = '<ExpandableTable><table><tr><td>cell</td></tr></table></ExpandableTable>';
    const out = C.convertExpandableTableToMarkdown(input);
    assert.equal(out, '<table><tr><td>cell</td></tr></table>');
});

// ---------- UnorderedCodeList (standalone) -----------------------------

test('convertUnorderedCodeListStandalone: resolves data path to bullet list', () => {
    const getData = () => ({ alpine: { base: ['3.18', '3.19', '3.20'] } });
    const input = '<UnorderedCodeList data={data.alpine.base} />';
    const out = C.convertUnorderedCodeListStandalone(input, getData, null);
    assert.match(out, /- `3\.18`/);
    assert.match(out, /- `3\.19`/);
    assert.match(out, /- `3\.20`/);
});

test('convertUnorderedCodeListStandalone: handles "value (comment)" pattern', () => {
    const getData = () => ({ x: { y: ['nodejs@20 (LTS)', 'nodejs@22 (current)'] } });
    const input = '<UnorderedCodeList data={data.x.y} />';
    const out = C.convertUnorderedCodeListStandalone(input, getData, null);
    assert.match(out, /- `nodejs@20` \(LTS\)/);
    assert.match(out, /- `nodejs@22` \(current\)/);
});

test('convertUnorderedCodeListStandalone: missing path -> unchanged', () => {
    const getData = () => ({});
    const input = '<UnorderedCodeList data={data.nope} />';
    const out = C.convertUnorderedCodeListStandalone(input, getData, null);
    assert.equal(out, input);
});

// ---------- dropSilentComponents ---------------------------------------

test('dropSilentComponents: removes self-closing PricingCalculator', () => {
    assert.equal(C.dropSilentComponents('before <PricingCalculator /> after'), 'before  after');
});

test('dropSilentComponents: removes wrapping form with content', () => {
    assert.equal(
        C.dropSilentComponents('x <TechCard>inside</TechCard> y'),
        'x  y'
    );
});

test('dropSilentComponents: removes self-closing with JSX object props (Icons[X])', () => {
    const input = '<GroupCards heading="X" items={[{name: "A", link: "/a"}]} />';
    const out = C.dropSilentComponents(input);
    assert.equal(out, '');
});

test('dropSilentComponents: leaves unrelated tags alone', () => {
    const input = '<MyComponent foo="bar" />';
    assert.equal(C.dropSilentComponents(input), input);
});

test('dropSilentComponents: GroupCards with `>` inside JSX expression (e.g. arrow fn)', () => {
    // Defensive: jsx attribute could in theory contain `>` inside an arrow fn
    // (`items={(x) => x > 0}`). The brace-aware scanner must not treat that as
    // the tag close.
    const input = '<GroupCards filter={(x) => x > 0} heading="X" />';
    const out = C.dropSilentComponents(input);
    assert.equal(out, '');
});

// ---------- helpers ----------------------------------------------------

test('findMatchingBrace: simple', () => {
    assert.equal(C.findMatchingBrace('{abc}', 0), 4);
});

test('findMatchingBrace: nested', () => {
    assert.equal(C.findMatchingBrace('{{x}}', 0), 4);
});

test('findMatchingBrace: ignores braces inside strings', () => {
    assert.equal(C.findMatchingBrace(`{"}"}`, 0), 4);
    assert.equal(C.findMatchingBrace(`{'}'}`, 0), 4);
});

test('findMatchingBrace: ignores braces inside backticks', () => {
    assert.equal(C.findMatchingBrace('{`}`}', 0), 4);
});

test('splitTopLevelObjects: array of object literals', () => {
    const out = C.splitTopLevelObjects(`{a: 1}, {b: 2}, {c: {d: 3}}`);
    assert.deepEqual(out, ['a: 1', 'b: 2', 'c: {d: 3}']);
});

// ---------- end-to-end pipeline approximation --------------------------

test('end-to-end: coding-agents.mdx-like snippet round-trips cleanly', () => {
    const input = `
<Note type="tip" title="Platform-first">
Some intro text with **bold** and \`code\`.
</Note>

<CodingAgentsTopology />

<AsciiGraph ariaLabel="loop">{\`    \`}<span className="ascii-graph__highlight">{\`zcp\`}</span>{\`
   topology
\`}</AsciiGraph>

<section className="zcp-landscape-section">
  <header>
    <h4>Local agents</h4>
    <p className="zcp-landscape-section__examples">Cursor · Zed</p>
  </header>
  <p>Body text.</p>
</section>

<DocCardList items={[
  { type: 'link', href: '/q', label: 'Q', customProps: { icon: Icons['rocket'], description: 'desc' } },
]} />
`;
    let out = input;
    out = C.convertNoteToMarkdown(out);
    out = C.convertAsciiGraphToMarkdown(out);
    out = C.convertDocCardListToMarkdown(out);
    out = C.convertCustomCardToMarkdown(out);
    out = C.convertDropdownToMarkdown(out);
    out = C.convertSectionLandscapeToMarkdown(out);
    out = C.convertCodingAgentsTopologyToMarkdown(out);
    out = C.convertDeployButtonToMarkdown(out);
    out = C.convertVideoToMarkdown(out);
    out = C.convertBadgeToMarkdown(out);
    out = C.convertButtonToMarkdown(out);
    out = C.convertLinkToMarkdown(out);
    out = C.dropSilentComponents(out);

    assert.match(out, /:::tip\[Platform-first\]/, 'Note converted to admonition');
    assert.match(out, /Zerops development project/, 'CodingAgentsTopology rendered as ASCII');
    assert.match(out, /```text/, 'AsciiGraph fenced as code');
    assert.match(out, /   topology/, 'AsciiGraph content preserved');
    assert.match(out, /#### Local agents/, 'Section h4 -> ####');
    assert.match(out, /_Cursor · Zed_/, 'Section examples italicized');
    assert.match(out, /Body text\./, 'Section body preserved');
    assert.match(out, /- \[Q\]\(\/q\) — desc/, 'DocCardList -> bullet');
    assert.doesNotMatch(out, /<Note/);
    assert.doesNotMatch(out, /<AsciiGraph/);
    assert.doesNotMatch(out, /<DocCardList/);
    assert.doesNotMatch(out, /<section className/);
    assert.doesNotMatch(out, /<CodingAgentsTopology/);
    assert.doesNotMatch(out, /\{`/, 'No leftover JSX template-literal artifacts');
});
