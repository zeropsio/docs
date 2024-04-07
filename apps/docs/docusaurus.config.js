/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config()
const fs = require("fs")
const reverseSidebar = require("./src/utils/reverse-sidebar")
const excludeSidebarResults = require("./src/utils/exclude-sidebar-results")

const announcementBar = JSON.parse(fs.readFileSync("./announcement.json"))

/** @type {import('@medusajs/docs').MedusaDocusaurusConfig} */
const config = {
  title: "Zerops",
  tagline: "Explore and learn how to use Zerops",
  url: process.env.URL || "http://localhost:3000",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "zerops",
  projectName: "zerops/docs-v2",
  plugins: [
    require.resolve("docusaurus-plugin-image-zoom"),
    async function tailwindPlugin() {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"))
          postcssOptions.plugins.push(require("autoprefixer"))
          return postcssOptions
        },
      }
    },
    function webpackPlugin() {
      return {
        name: "custom-webpack-plugin",
        configureWebpack() {
          return {
            devServer: {
              client: {
                overlay: {
                  runtimeErrors: (error) => {
                    if (
                      error.message ===
                      "ResizeObserver loop completed with undelivered notifications."
                    ) {
                      return false
                    }
                    return true
                  },
                },
              },
            },
          }
        },
      }
    },
  ],
  themeConfig: {
    image: "img/docs-meta.jpeg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    announcementBar: {
      id: '/help/contacts',
      content:
        'DOCS STILL IN PROGRESS!<br><br>Contact us if you need any help.',
      backgroundColor: '#FF937B',
      textColor: '#091E42',
      isCloseable: false,
    },
    prism: {
      defaultLanguage: "js",
      plugins: ["line-numbers", "show-language"],
      theme: require("./src/themes/medusaDocs"),
    },
    zoom: {
      selector: ".markdown :not(.no-zoom-img) > img:not(.no-zoom-img)",
    },
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: "Zerops",
        src: "img/logo-icon.png",
        srcDark: "img/logo-icon-dark.png",
        width: 23,
        height: 20,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "homepage",
          label: "Docs",
          position: "left",
        },
      ],
    },
    navbarActions: [
      {
        type: "button",
        label: "Report an Issue",
        className: "max-[1014px]:hidden",
        href: "https://github.com/zeropsio/docs-v2/issues/new?assignees=&labels=type%3A+docs",
      },
    ],
    mobileLogo: {
      alt: "Zerops",
      src: "img/logo-mobile.png",
      srcDark: "img/logo-mobile-dark.png",
      width: 82,
      height: 20,
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} Zerops s.r.o.. All rights reserved.`,
    },
    socialLinks: [
      {
        type: "discord",
        href: "https://discord.gg/invite/WDvCZ54",
      },
      {
        type: "twitter",
        href: "https://twitter.com/zeropsio",
      },
      {
        type: "linkedin",
        href: "https://www.linkedin.com/company/zeropsio",
      },
      {
        type: "github",
        href: "https://github.com/zeropsio",
      },
    ],
    footerFeedback: {
      event: "survey",
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    cloudinaryConfig: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
      flags: ["fl_lossy", "f_auto"],
      resize: {
        action: "pad",
        aspectRatio: "16:9",
      },
      roundCorners: 16,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/zeropsio/docs/tree/main/apps/docs",
          path: "content",
          routeBasePath: "/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          showLastUpdateTime: true,
          // breadcrumbs: false,
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return reverseSidebar(
              excludeSidebarResults(sidebarItems, args.item),
              args.item
            )
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "xxx",
        },
        sitemap: {
          filename: "sitemap-docs.xml",
        },
      },
    ],
  ],
}

if (Object.keys(announcementBar).length) {
  config.themeConfig.announcementBar = announcementBar
}

module.exports = config
