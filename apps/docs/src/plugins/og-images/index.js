const fs = require('fs');
const path = require('path');
const {
  DEFAULT_OG_IMAGE,
  OG_BASE_URL,
  OG_IMAGE_DIR,
  sourceToOgSlug,
} = require('./utils');

function absoluteOgUrl(siteUrl, imagePath) {
  const base = siteUrl.replace(/\/$/, '');
  const img = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${base}${img}`;
}

/** @param {import('@docusaurus/types').LoadContext} context */
module.exports = function ogImagesPlugin(context) {
  const ogDir = path.join(context.siteDir, OG_IMAGE_DIR);
  const fallbackUrl = absoluteOgUrl(OG_BASE_URL, DEFAULT_OG_IMAGE);

  return {
    name: 'docusaurus-plugin-og-images',

    async allContentLoaded({ actions, allContent }) {
      const docsPlugin = allContent['docusaurus-plugin-content-docs'];
      const loadedVersions = docsPlugin?.loadedVersions;

      const ogImageByDocId = {};

      for (const version of loadedVersions ?? []) {
        for (const doc of version.docs) {
          const slug = sourceToOgSlug(doc.source);
          const pngPath = path.join(ogDir, `${slug}.png`);
          const hasCustom = fs.existsSync(pngPath);

          ogImageByDocId[doc.id] = hasCustom
            ? `${OG_BASE_URL}/img/og/${slug}.png`
            : fallbackUrl;
        }
      }

      actions.setGlobalData({ ogImageByDocId });
    },
  };
};
