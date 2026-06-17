const fs = require('fs');
const path = require('path');

const OG_IMAGE_DIR = 'static/img/og';
const DEFAULT_OG_IMAGE = 'img/docs-meta.jpg';
const OG_BASE_URL = 'https://docs.zerops.io';

/** quickstart/quickstart.mdx → quickstart-quickstart */
function toOgSlug(relativePath) {
  return relativePath
    .replace(/\\/g, '/')
    .replace(/\.mdx?$/i, '')
    .replace(/\//g, '-');
}

/** @site/content/foo/bar.mdx → foo-bar */
function sourceToOgSlug(source) {
  const rel = source.replace(/^@site\/content\//, '');
  return toOgSlug(rel);
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { title: null, description: null };

  const fm = match[1];
  const strip = (s) => s.trim().replace(/^['"]([\s\S]*)['"]$/, '$1');

  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  const descMatch = fm.match(/^description:\s*(.+)$/m);

  return {
    title: titleMatch ? strip(titleMatch[1]) : null,
    description: descMatch ? strip(descMatch[1]) : null,
  };
}

function walkMdxFiles(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(full, baseDir));
    } else if (entry.name.endsWith('.mdx')) {
      files.push(path.relative(baseDir, full));
    }
  }

  return files;
}

module.exports = {
  OG_IMAGE_DIR,
  DEFAULT_OG_IMAGE,
  OG_BASE_URL,
  toOgSlug,
  sourceToOgSlug,
  extractFrontmatter,
  walkMdxFiles,
};
