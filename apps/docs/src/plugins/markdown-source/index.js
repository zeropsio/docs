const fs = require('fs-extra');
const path = require('path');

/**
 * Docusaurus plugin to copy raw markdown files to build output
 * This allows users to view markdown source by appending .md to URLs
 * Now handles imported MDX files by inlining their content
 */

// Load data.json for variable substitution
let dataJson = null;
function getDataJson(siteDir) {
    if (!dataJson) {
        try {
            const dataPath = path.join(siteDir, 'static', 'data.json');
            dataJson = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        } catch (error) {
            console.warn('[markdown-source-plugin] Could not load data.json:', error.message);
            dataJson = {};
        }
    }
    return dataJson;
}

// Extract title and description from frontmatter
function extractFrontmatter(content) {
    const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);

    if (!frontmatterMatch) {
        return { title: null, description: null, content };
    }

    const frontmatter = frontmatterMatch[1];
    const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
    const descMatch = frontmatter.match(/^description:\s*(.+)$/m);

    const title = titleMatch ? titleMatch[1].trim() : null;
    const description = descMatch ? descMatch[1].trim() : null;

    // Remove frontmatter from content
    const contentWithoutFrontmatter = content.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

    return { title, description, content: contentWithoutFrontmatter };
}

// Substitute variables in content
function substituteVariables(content, siteDir) {
    const data = getDataJson(siteDir);

    // Replace {data.path.to.value} with actual values
    content = content.replace(/\{data\.([^}]+)\}/g, (match, path) => {
        try {
            // Split path and traverse the data object
            const keys = path.split('.');
            let value = data;

            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    // Path not found, return original expression
                    return match;
                }
            }

            // Handle different value types
            if (Array.isArray(value)) {
                // For arrays, join with commas
                return value.join(', ');
            } else if (typeof value === 'object') {
                // For objects, try to convert to a readable string
                return JSON.stringify(value);
            } else {
                // For primitives, convert to string
                return String(value);
            }
        } catch (error) {
            console.warn(`[markdown-source-plugin] Error resolving variable: ${path}`, error.message);
            return match; // Keep original if resolution fails
        }
    });

    // Also handle template literals like ${variable} - just remove them as context isn't available
    content = content.replace(/\$\{[^}]+\}/g, '');

    return content;
}

// Convert Tabs/TabItem components to readable markdown format
function convertTabsToMarkdown(content) {
    const tabsPattern = /<Tabs[^>]*>([\s\S]*?)<\/Tabs>/g;

    return content.replace(tabsPattern, (fullMatch, tabsContent) => {
        const tabItemPattern = /<TabItem\s+[^>]*value="([^"]*)"[^>]*label="([^"]*)"[^>]*>([\s\S]*?)<\/TabItem>/g;

        let result = [];
        let match;

        while ((match = tabItemPattern.exec(tabsContent)) !== null) {
            const [, value, label, itemContent] = match;

            // Clean up indentation from the tab content
            const cleanContent = itemContent
                .split('\n')
                .map(line => line.replace(/^\s{4}/, '')) // Remove 4-space indentation
                .join('\n')
                .trim();

            result.push(`**${label}:**\n\n${cleanContent}`);
        }

        return result.join('\n\n---\n\n');
    });
}

// Convert details/summary components to readable markdown format
function convertDetailsToMarkdown(content) {
    const detailsPattern = /<details>\s*<summary>(<strong>)?([^<]+)(<\/strong>)?<\/summary>([\s\S]*?)<\/details>/g;

    return content.replace(detailsPattern, (fullMatch, strongOpen, summaryText, strongClose, detailsContent) => {
        // Clean up the details content
        const cleanContent = detailsContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n')
            .trim();

        return `### ${summaryText.trim()}\n\n${cleanContent}`;
    });
}

// Convert FAQ components to readable markdown format
function convertFAQToMarkdown(content) {
    // Convert FAQItem components
    content = content.replace(
        /<FAQItem\s+question="([^"]+)"\s*>([\s\S]*?)<\/FAQItem>/g,
        (match, question, answer) => {
            const cleanAnswer = answer.trim();
            return `**Question: ${question}**\n\n${cleanAnswer}\n`;
        }
    );

    // Remove FAQ wrapper tags but keep content
    content = content.replace(/<FAQ>([\s\S]*?)<\/FAQ>/g, (match, content) => {
        return content;
    });

    return content;
}

// Convert HTML tables to markdown tables, flattening rowspan/colspan
function convertHtmlTablesToMarkdown(content, siteDir) {
    return content.replace(/<table[\s\S]*?<\/table>/g, (tableHtml) => {
        // Resolve UnorderedCodeList components to comma-separated values
        tableHtml = tableHtml.replace(
            /<UnorderedCodeList\s+data=\{([^}]+)\}\s*\/>/g,
            (match, dataPath) => {
                try {
                    const data = getDataJson(siteDir);
                    const keys = dataPath.trim().replace(/^data\./, '').split('.');
                    let val = data;
                    for (const key of keys) {
                        if (val && typeof val === 'object' && key in val) val = val[key];
                        else return match;
                    }
                    return Array.isArray(val) ? val.join(', ') : String(val);
                } catch (e) { return match; }
            }
        );

        // Separate thead and tbody
        const theadMatch = tableHtml.match(/<thead[^>]*>([\s\S]*?)<\/thead>/);
        const tbodyMatch = tableHtml.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/);
        const theadHtml = theadMatch ? theadMatch[1] : '';
        const tbodyHtml = tbodyMatch ? tbodyMatch[1] : (theadMatch ? '' : tableHtml);

        function extractRowHtmls(html) {
            const rows = [];
            const rowPattern = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
            let m;
            while ((m = rowPattern.exec(html)) !== null) rows.push(m[1]);
            return rows;
        }

        function cleanCellContent(raw) {
            return raw
                .replace(/<strong>([\s\S]*?)<\/strong>/g, '**$1**')
                .replace(/<b>([\s\S]*?)<\/b>/g, '**$1**')
                .replace(/<em>([\s\S]*?)<\/em>/g, '*$1*')
                .replace(/<i>([\s\S]*?)<\/i>/g, '*$1*')
                .replace(/<code>([\s\S]*?)<\/code>/g, '`$1`')
                .replace(/&nbsp;/g, ' ')
                .replace(/<[^>]+>/g, '')
                .replace(/\s+/g, ' ')
                .trim();
        }

        // Build a 2D grid, expanding rowspan/colspan by repeating cell content
        function buildGrid(rowHtmls, startRow, grid) {
            for (let ri = 0; ri < rowHtmls.length; ri++) {
                const absRi = startRow + ri;
                if (!grid[absRi]) grid[absRi] = [];

                let colIndex = 0;
                const cellPattern = /<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/g;
                let cellMatch;

                while ((cellMatch = cellPattern.exec(rowHtmls[ri])) !== null) {
                    while (grid[absRi][colIndex] !== undefined) colIndex++;

                    const attrs = cellMatch[1];
                    const rowspan = parseInt((attrs.match(/rowspan="?(\d+)"?/) || [, 1])[1]);
                    const colspan = parseInt((attrs.match(/colspan="?(\d+)"?/) || [, 1])[1]);
                    const text = cleanCellContent(cellMatch[2]);

                    for (let r = 0; r < rowspan; r++) {
                        const targetRi = absRi + r;
                        if (!grid[targetRi]) grid[targetRi] = [];
                        for (let c = 0; c < colspan; c++) {
                            grid[targetRi][colIndex + c] = text;
                        }
                    }

                    colIndex += colspan;
                }
            }
        }

        const headerRows = extractRowHtmls(theadHtml);
        const bodyRows = extractRowHtmls(tbodyHtml);
        const grid = [];
        buildGrid(headerRows, 0, grid);
        buildGrid(bodyRows, headerRows.length, grid);

        if (grid.length === 0) return tableHtml;

        const colCount = Math.max(...grid.map(row => row.length));

        function rowToMd(gridRow) {
            const cells = Array.from({ length: colCount }, (_, i) =>
                gridRow[i] !== undefined ? gridRow[i] : ''
            );
            return '| ' + cells.join(' | ') + ' |';
        }

        // Merge multiple header rows into one by taking the last value per column
        let result = '';
        if (headerRows.length > 0) {
            const mergedHeader = Array.from({ length: colCount }, (_, i) => {
                for (let ri = headerRows.length - 1; ri >= 0; ri--) {
                    const val = grid[ri][i];
                    if (val !== undefined && val !== '') return val;
                }
                return '';
            });
            result += '| ' + mergedHeader.join(' | ') + ' |\n';
            result += '| ' + Array(colCount).fill('---').join(' | ') + ' |\n';
        }
        for (let ri = headerRows.length; ri < grid.length; ri++) {
            result += rowToMd(grid[ri]) + '\n';
        }

        return result;
    });
}

// Preserve markdown tables while processing other content
function preserveTablesWhileProcessing(content, processingFn) {
    // Split content by tables
    const tablePattern = /(\|.*\|\n\|.*\|\n(?:\|.*\|\n)*)/g;
    const sections = content.split(tablePattern);

    let result = '';

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        // If section starts with |, it's a table - preserve it
        if (section.trim().startsWith('|')) {
            result += section;
        } else {
            // Process non-table content
            result += processingFn(section);
        }
    }

    return result;
}

// Resolve and inline imported MDX files
function resolveImports(content, currentFilePath, docsDir, siteDir, processedFiles = new Set()) {
    // Prevent circular imports
    const normalizedPath = path.normalize(currentFilePath);
    if (processedFiles.has(normalizedPath)) {
        console.warn(`[markdown-source-plugin] Circular import detected: ${currentFilePath}`);
        return content;
    }
    processedFiles.add(normalizedPath);

    // Match import statements for MDX files
    // Matches: import Something from './path/to/file.mdx'
    // Matches: import Something from '@site/path/to/file.mdx'
    // Matches: import Something from 'src/components/content/file.mdx'
    const importPattern = /^import\s+(?:\{[^}]+\}|\w+)\s+from\s+['"]([^'"]+\.mdx?)['"];?\s*$/gm;

    let match;
    const imports = [];

    while ((match = importPattern.exec(content)) !== null) {
        imports.push({
            fullMatch: match[0],
            importPath: match[1],
            index: match.index
        });
    }

    // Process imports in reverse order to maintain correct indices
    imports.reverse();

    for (const { fullMatch, importPath } of imports) {
        try {
            // Resolve the import path
            let resolvedPath;

            if (importPath.startsWith('@site/')) {
                // Handle @site alias
                resolvedPath = path.join(siteDir, importPath.replace('@site/', ''));
            } else if (importPath.startsWith('./') || importPath.startsWith('../')) {
                // Handle relative imports
                const currentDir = path.dirname(path.join(docsDir, currentFilePath));
                resolvedPath = path.resolve(currentDir, importPath);
            } else if (importPath.startsWith('src/components/content/')) {
                // Handle src/components/content/ imports (content templates)
                resolvedPath = path.join(siteDir, importPath);
                console.log(`[markdown-source-plugin] Resolving content template: ${importPath} -> ${resolvedPath}`);
            } else if (importPath.includes('/components/content/')) {
                // Handle variations like @/components/content/ or ~/components/content/
                const contentPath = importPath.substring(importPath.indexOf('components/content/'));
                resolvedPath = path.join(siteDir, 'src', contentPath);
                console.log(`[markdown-source-plugin] Resolving content template: ${importPath} -> ${resolvedPath}`);
            } else {
                // Skip non-local imports (probably npm packages or other non-content imports)
                console.log(`[markdown-source-plugin] Skipping non-local import: ${importPath}`);
                continue;
            }

            // Check if file exists
            if (!fs.existsSync(resolvedPath)) {
                console.warn(`[markdown-source-plugin] Import not found: ${resolvedPath}`);
                continue;
            }

            // Read the imported file
            const importedContent = fs.readFileSync(resolvedPath, 'utf8');

            // Remove frontmatter from imported content
            const { content: contentWithoutFrontmatter } = extractFrontmatter(importedContent);

            // Recursively resolve imports in the imported file
            const relativeImportPath = path.relative(docsDir, resolvedPath);
            const processedImportContent = resolveImports(
                contentWithoutFrontmatter,
                relativeImportPath,
                docsDir,
                siteDir,
                new Set(processedFiles)
            );

            // Replace the import statement with the imported content
            content = content.replace(
                fullMatch,
                `\n${processedImportContent}\n`
            );

            console.log(`  ✓ Inlined import: ${importPath} into ${currentFilePath}`);
        } catch (error) {
            console.error(`[markdown-source-plugin] Error processing import ${importPath}:`, error.message);
        }
    }

    return content;
}

// Clean markdown content for raw display - remove MDX/Docusaurus-specific syntax
function cleanMarkdownForDisplay(content, filepath, siteDir, docsDir) {
    // Get the directory path for this file (relative to docs root)
    const fileDir = filepath.replace(/[^/]*$/, '');

    // 1. Extract frontmatter and get title/description
    const { title, description, content: contentWithoutFrontmatter } = extractFrontmatter(content);
    content = contentWithoutFrontmatter;

    // 2. Resolve and inline imported MDX files FIRST (before removing imports)
    content = resolveImports(content, filepath, docsDir, siteDir);

    // 3. Remove JSX-style comments
    content = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

    // 4. Remove <br/> tags (replace with newlines)
    content = content.replace(/<br\s*\/?>/g, '\n');

    // 5. Remove remaining import statements (after inlining MDX imports)
    content = content.replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '');

    // 6. Substitute variables like {data.something}
    content = substituteVariables(content, siteDir);

    // 6b. Resolve Var components (SetVar, Var, VarLink, VarCodeBlock, VarReasons, IfVar)
    // First, collect all SetVar values
    const vars = {};
    content.replace(
        /<SetVar\s+name=["']([^"']+)["']\s+value=["']([^"']+)["']\s*\/>/g,
        (match, name, value) => { vars[name] = value; return ''; }
    );
    // Also collect SetVar with JSX expression values (simple strings)
    content.replace(
        /<SetVar\s+name=["']([^"']+)["']\s+value=\{([^}]+)\}\s*\/>/g,
        (match, name, expr) => {
            // Only handle simple string/data references, skip arrays/objects
            const trimmed = expr.trim();
            if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
                // Try to resolve data.x.y references
                const dataMatch = trimmed.match(/^data\.(.+)$/);
                if (dataMatch) {
                    const data = getDataJson(siteDir);
                    const keys = dataMatch[1].split('.');
                    let val = data;
                    for (const key of keys) {
                        if (val && typeof val === 'object' && key in val) {
                            val = val[key];
                        } else {
                            val = null;
                            break;
                        }
                    }
                    if (val !== null && typeof val !== 'object') {
                        vars[name] = String(val);
                    }
                }
            }
            return '';
        }
    );
    // Remove all SetVar tags
    content = content.replace(/<SetVar\s+[^>]*\/>/g, '');
    // Replace <Var name="x" /> with the variable value
    content = content.replace(
        /<Var\s+name=["']([^"']+)["']\s*\/>/g,
        (match, name) => vars[name] || ''
    );
    // Replace <VarLink name="x" path="/{{VAR}}/...">children</VarLink> with markdown links
    content = content.replace(
        /<VarLink\s+name=["']([^"']+)["']\s+path=["']([^"']+)["']\s*>([\s\S]*?)<\/VarLink>/g,
        (match, name, path, children) => {
            const value = vars[name] || '';
            const href = path.replace(/\{\{VAR\}\}/g, value);
            // Clean children of any remaining HTML/JSX
            const cleanChildren = children
                .replace(/<Var\s+name=["']([^"']+)["']\s*\/>/g, (m, n) => vars[n] || '')
                .replace(/<code>(.*?)<\/code>/g, '`$1`')
                .replace(/<[^>]+>/g, '')
                .trim();
            return `[${cleanChildren}](${href})`;
        }
    );
    // Remove VarCodeBlock, VarReasons, IfVar (complex components we can't easily resolve)
    content = content.replace(/<VarCodeBlock\s+[^>]*\/>/g, '');
    content = content.replace(/<VarReasons\s+[^>]*\/>/g, '');
    content = content.replace(/<IfVar\s+[^>]*>([\s\S]*?)<\/IfVar>/g, '$1');

    // 7. Remove all images (HTML and markdown) - sources won't resolve in raw markdown
    content = content.replace(/<Image\s+[^>]*\/?>/g, '');
    content = content.replace(/<img\s+[^>]*\/?>/g, '');
    content = content.replace(/<p align="center">\s*\n?\s*<img[^>]*\/>\s*\n?\s*<\/p>/g, '');
    content = content.replace(/!\[[^\]]*\]\([^)]+\)/g, '');

    // 8. Remove figure tags
    content = content.replace(/<figure[^>]*>([\s\S]*?)<\/figure>/g, '');

    // 9. Convert YouTube iframes to text links
    content = content.replace(
        /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]+)[^"]*"[^>]*title="([^"]*)"[^>]*>[\s\S]*?<\/iframe>/g,
        'Watch the video: [$2](https://www.youtube.com/watch?v=$1)'
    );

    // 10. Clean HTML5 video tags - keep HTML but add fallback text
    content = content.replace(
        /<video[^>]*>\s*<source src=["']([^"']+)["'][^>]*>\s*<\/video>/g,
        '<video controls>\n  <source src="$1" type="video/mp4" />\n  <p>Video demonstration: $1</p>\n</video>'
    );

    // 11. Remove <Head> components
    content = content.replace(/<Head>[\s\S]*?<\/Head>/g, '');

    // 12. Convert HTML <a> tags to markdown links
    content = content.replace(
        /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/g,
        (match, href, text) => {
            // Clean inner HTML tags (like <code>, <strong>) to plain text
            const cleanText = text
                .replace(/<code>(.*?)<\/code>/g, '`$1`')
                .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
                .replace(/<em>(.*?)<\/em>/g, '*$1*')
                .replace(/<b>(.*?)<\/b>/g, '**$1**')
                .replace(/<[^>]+>/g, '')
                .trim();
            return `[${cleanText}](${href})`;
        }
    );

    // 13. Convert FAQ components to readable markdown (preserve content)
    content = convertFAQToMarkdown(content);

    // 14. Convert Tabs/TabItem components to readable markdown (preserve content)
    content = convertTabsToMarkdown(content);

    // 15. Convert details/summary components to readable markdown (preserve content)
    content = convertDetailsToMarkdown(content);

    // 16. Convert HTML tables to markdown tables
    content = convertHtmlTablesToMarkdown(content, siteDir);

    // 17. Remove custom React/MDX components while preserving tables
    content = preserveTablesWhileProcessing(content, (section) => {
        return section.replace(/<[A-Z][a-zA-Z]*[\s\S]*?(?:\/>|<\/[A-Z][a-zA-Z]*>)/g, '');
    });

    // 18. Remove consecutive blank lines (keep max 2 newlines = 1 blank line)
    const lines = content.split('\n');
    const processedLines = [];
    let lastLineWasEmpty = false;

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === '' && lastLineWasEmpty) {
            continue; // Skip consecutive empty lines
        }

        processedLines.push(line);
        lastLineWasEmpty = trimmedLine === '';
    }

    content = processedLines.join('\n');

    // 19. Add title as H1 at the beginning if it exists
    if (title) {
        content = `# ${title}\n\n${content}`;
    }

    // 20. Remove any leading blank lines
    content = content.replace(/^\s*\n/, '');

    return content;
}

// Recursively find all markdown files in a directory
function findMarkdownFiles(dir, fileList = [], baseDir = dir) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findMarkdownFiles(filePath, fileList, baseDir);
        } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
            // Store relative path from base directory
            const relativePath = path.relative(baseDir, filePath);
            fileList.push(relativePath);
        }
    });

    return fileList;
}

// Copy image directories from docs to build
async function copyImageDirectories(docsDir, buildDir) {
    const imageDirs = [];

    // Recursively find all 'img' directories in docs
    function findImgDirs(dir, baseDir = dir) {
        const files = fs.readdirSync(dir);

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                if (file === 'img') {
                    // Found an img directory, store its relative path
                    const relativePath = path.relative(baseDir, dir);
                    imageDirs.push({ source: filePath, relativePath });
                } else {
                    // Continue searching in subdirectories
                    findImgDirs(filePath, baseDir);
                }
            }
        });
    }

    // Find all img directories
    findImgDirs(docsDir);

    // Copy each img directory to build
    let copiedCount = 0;
    for (const { source, relativePath } of imageDirs) {
        const destination = path.join(buildDir, relativePath, 'img');

        try {
            await fs.copy(source, destination);
            const imageCount = fs.readdirSync(source).length;
            console.log(`  ✓ Copied: ${relativePath}/img/ (${imageCount} images)`);
            copiedCount++;
        } catch (error) {
            console.error(`  ✗ Failed to copy ${relativePath}/img/:`, error.message);
        }
    }

    return copiedCount;
}

module.exports = function markdownSourcePlugin(context, options) {
    return {
        name: 'markdown-source-plugin',

        // Provide theme components from the plugin (eliminates need for manual copying)
        getThemePath() {
            return path.resolve(__dirname, './theme');
        },

        async postBuild({ outDir }) {
            const docsDir = path.join(context.siteDir, 'content');
            const buildDir = outDir;

            console.log('[markdown-source-plugin] Copying markdown source files...');

            // Find all markdown files in docs directory
            const mdFiles = findMarkdownFiles(docsDir);
            let copiedCount = 0;

            // Process each markdown file to build directory
            for (const mdFile of mdFiles) {
                const sourcePath = path.join(docsDir, mdFile);
                // Convert .mdx to .md for the destination
                const destFile = mdFile.replace(/\.mdx$/, '.md');
                const destPath = path.join(buildDir, destFile);

                try {
                    // Ensure destination directory exists
                    await fs.ensureDir(path.dirname(destPath));

                    // Read the markdown file
                    const content = await fs.readFile(sourcePath, 'utf8');

                    // Pass siteDir and docsDir for import resolution
                    const cleanedContent = cleanMarkdownForDisplay(content, mdFile, context.siteDir, docsDir);

                    // Write the cleaned content
                    await fs.writeFile(destPath, cleanedContent, 'utf8');
                    copiedCount++;

                    console.log(`  ✓ Processed: ${mdFile} -> ${destFile}`);
                } catch (error) {
                    console.error(`  ✗ Failed to process ${mdFile}:`, error.message);
                }
            }

            console.log(`[markdown-source-plugin] Successfully copied ${copiedCount} markdown files`);

            // Copy image directories
            console.log('[markdown-source-plugin] Copying image directories...');
            const imgDirCount = await copyImageDirectories(docsDir, buildDir);
            console.log(`[markdown-source-plugin] Successfully copied ${imgDirCount} image directories`);
        },
    };
};