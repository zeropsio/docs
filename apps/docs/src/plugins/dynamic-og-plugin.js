/** @type {import('@docusaurus/types').Plugin} */
function dynamicOgPlugin(context, options) {
  return {
    name: 'dynamic-og-plugin',
    injectHtmlTags({ content }) {
      const { siteConfig, relativePath } = context;
      
      // Default to homepage if no content or frontMatter
      const frontMatter = content?.frontMatter || {};
      const currentPath = relativePath || 'homepage';
      
      const ogImageUrl = siteConfig.customFields.getOgImageUrl({
        frontMatter,
        relativePath: currentPath,
      });

      return {
        headTags: [
          {
            tagName: 'meta',
            attributes: {
              property: 'og:image',
              content: ogImageUrl,
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'twitter:image',
              content: ogImageUrl,
            },
          },
        ],
      };
    },
  };
}

module.exports = dynamicOgPlugin; 