/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config"
import { themes as prismThemes } from "prism-react-renderer"
const reverseSidebar = require("./src/utils/reverse-sidebar")
const excludeSidebarResults = require("./src/utils/exclude-sidebar-results")

/** @type {import('@medusajs/docs').MedusaDocusaurusConfig} */
const config = {
  title: "Zerops",
  tagline: "Explore and learn how to use Zerops",
  url: process.env.URL || "http://localhost:3000",
  baseUrl: "/",
  trailingSlash: false,
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "zerops",
  projectName: "zerops/docs",
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
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig: {
    mermaid: {
      theme: {
        light: "base",
        dark: "base",
      },
      options: {
        themeVariables: {
          background: "#FFFFFF",
          mainBkg: "#FFFFFF",
          primaryColor: "#FFFFFF",
          primaryTextColor: "#030712",
          primaryBorderColor: "#D1D5DB",
          nodeBorder: "#D1D5DB",
          lineColor: "#11181C",
          fontFamily: "Inter",
          fontSize: "13px",
          tertiaryColor: "#F3F4F6",
          tertiaryBorderColor: "#D1D5DB",
          tertiaryTextColor: "#030712",
          clusterBkg: "#F3F4F6",
        },
      },
    },
    image: "img/docs-meta.jpg",
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      defaultLanguage: "ts",
      additionalLanguages: ["bash", "json"],
      plugins: ["line-numbers", "show-language"],
      theme: {
        ...prismThemes.vsDark,
        plain: {
          ...prismThemes.vsDark.plain,
          backgroundColor: "#111827",
        },
      },
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
        {
          type: "search",
          position: "right",
        },
      ],
    },
    navbarActions: [],
    mobileLogo: {
      alt: "Zerops",
      src: "img/logo-mobile.png",
      srcDark: "img/logo-mobile-dark.png",
      width: 23,
      height: 20,
    },
    footer: {
      copyright: `Docs theme & components by the amazing medusajs.com <br/> © ${new Date().getFullYear()} Zerops s.r.o..`,
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
    reportCodeLinkPrefix:
      "https://github.com/zeropsio/docs/issues/new?assignees=&labels=type%3A+docs&template=docs.yml&title=",
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
          editUrl: "https://github.com/zeropsio/docs/tree/main/apps/docs",
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
  customFields: {
    meilisearchHost:
      process.env.MEILISEARCH_HOST || "https://docs-search.zerops.io",
    meilisearchApiKey: process.env.MEILISEARCH_API_KEY || "foo",
    meilisearchIndexUid: process.env.MEILISEARCH_INDEX_UID || "docs",
  },
}

module.exports = config
