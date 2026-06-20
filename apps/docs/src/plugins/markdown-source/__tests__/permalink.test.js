'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  sourceToRelativePath,
  normalizePermalinkKey,
  permalinkToDestRelative,
  buildPermalinkToSourceMap,
} = require('../index');

test('sourceToRelativePath strips @site/content/ prefix', () => {
  assert.equal(
    sourceToRelativePath('@site/content/quickstart/quickstart-going-further.mdx'),
    'quickstart/quickstart-going-further.mdx',
  );
});

test('normalizePermalinkKey handles custom slug .md URLs', () => {
  assert.equal(
    normalizePermalinkKey('/quickstart/deploy-your-first-app.md'),
    '/quickstart/deploy-your-first-app',
  );
  assert.equal(normalizePermalinkKey('/.md'), '/');
  assert.equal(normalizePermalinkKey('/guides/backup/'), '/guides/backup');
});

test('permalinkToDestRelative maps homepage and nested paths', () => {
  assert.equal(permalinkToDestRelative('/'), '.md');
  assert.equal(
    permalinkToDestRelative('/quickstart/deploy-your-first-app'),
    'quickstart/deploy-your-first-app.md',
  );
});

test('buildPermalinkToSourceMap uses doc permalink, not file path', () => {
  const map = buildPermalinkToSourceMap(
    {
      'docusaurus-plugin-content-docs': {
        default: {
          loadedVersions: [
            {
              docs: [
                {
                  permalink: '/quickstart/deploy-your-first-app',
                  source:
                    '@site/content/quickstart/quickstart-going-further.mdx',
                },
                {
                  permalink: '/quickstart/quickstart',
                  source: '@site/content/quickstart/quickstart.mdx',
                },
              ],
            },
          ],
        },
      },
    },
    '/',
  );

  assert.equal(
    map['/quickstart/deploy-your-first-app'],
    'quickstart/quickstart-going-further.mdx',
  );
  assert.equal(map['/quickstart/quickstart'], 'quickstart/quickstart.mdx');
});
