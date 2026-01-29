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
  onBrokenLinks: "warn",
  onBrokenAnchors: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "favicon.ico",
  organizationName: "zerops",
  projectName: "zerops/docs",
  plugins: [
    './src/plugins/markdown-source',
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
          background: "#ECEFF3",
          mainBkg: "#ECEFF3",
          primaryColor: "#ECEFF3",
          primaryTextColor: "#030712",
          primaryBorderColor: "#D1D5DB",
          nodeBorder: "#D1D5DB",
          lineColor: "#11181C",
          fontFamily: "Inter",
          fontSize: "14.75px",
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
      additionalLanguages: [
          "bash",          // For CLI commands
          "json",          // Already included
          "php",           // For PHP & Apache/nginx
          "yaml",          // For config files
          "sql",           // For PostgreSQL/MariaDB
          "nginx",         // For nginx configs
          "go",            // For Go code
          "java",          // For Java code
          "python",        // For Python code
          "rust",          // For Rust code
          "typescript",    // For Node.js/Deno
          "javascript",    // For Node.js/Bun
          "csharp",        // For .NET
          "elixir",        // For Elixir
          "ruby",          // Common in web development
          "toml",          // Common for Rust configs
          "properties",    // For various config files
          "groovy",        // For Java-related builds
          "hcl",           // For infrastructure configs
          "diff",          // For showing changes
          "scss",          // For static sites
          "css",           // For static sites
          "http",          // For API examples
      ],
      plugins: ["line-numbers", "show-language"],
      theme: {
        ...prismThemes.vsDark,
        plain: {
          ...prismThemes.vsDark.plain,
          backgroundColor: "#111827",
          color: "#e6e6e6",
        },
        styles: [
          ...prismThemes.vsDark.styles,
          {
            types: ["comment", "prolog", "doctype", "cdata"],
            style: {
              color: "#6a9955",
              fontStyle: "italic",
            },
          },
          {
            types: ["namespace"],
            style: {
              opacity: 0.7,
            },
          },
          {
            types: ["string", "attr-value"],
            style: {
              color: "#ce9178",
            },
          },
          {
            types: ["punctuation", "operator"],
            style: {
              color: "#d4d4d4",
            },
          },
          {
            types: ["entity", "url", "symbol", "number", "boolean", "variable", "constant", "property", "regex", "inserted"],
            style: {
              color: "#b5cea8",
            },
          },
          {
            types: ["atrule", "keyword", "attr-name", "selector"],
            style: {
              color: "#569cd6",
            },
          },
          {
            types: ["function", "deleted", "tag"],
            style: {
              color: "#f44747",
            },
          },
          {
            types: ["function-variable"],
            style: {
              color: "#dcdcaa",
            },
          },
          {
            types: ["tag", "selector", "keyword"],
            style: {
              color: "#569cd6",
            },
          },
          {
            types: ["important", "bold"],
            style: {
              // fontWeight: "bold",
            },
          },
          {
            types: ["italic"],
            style: {
              fontStyle: "italic",
            },
          },
          {
            types: ["key", "property"],
            languages: ["yaml", "yml"],
            style: {
              color: "#9cdcfe",
            },
          },
          {
            types: ["string"],
            languages: ["yaml", "yml"],
            style: {
              color: "#ce9178",
            },
          },
          {
            types: ["number"],
            languages: ["yaml", "yml"],
            style: {
              color: "#C5DDB8",
            },
          },
          {
            types: ["function", "builtin"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#569CD6", // Light blue for commands
            },
          },
          {
            types: ["command", "builtin"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#569CD6", // Light blue for commands
              fontWeight: "bold",
            },
          },
          {
            types: ["option", "parameter"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#eac787", // Yellowish for parameters
            },
          },
          {
            types: ["keyword", "selector"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#81a1c1", // Blue for keywords like if, then, else
            },
          },
          {
            types: ["string", "char", "attr-value"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#a3be8c", // Green for strings
            },
          },
          {
            types: ["variable"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#d8dee9", // Light gray for variables
            },
          },
          {
            types: ["comment"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#616e88", // Gray for comments
              fontStyle: "italic",
            },
          },
          {
            types: ["shebang"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#8fbcbb", // Cyan for shebang
              fontWeight: "bold",
            },
          },
          {
            types: ["operator"],
            languages: ["bash", "shell", "sh"], 
            style: {
              color: "#81a1c1", // Blue for operators
            },
          },
          {
            types: ["punctuation"],
            languages: ["bash", "shell", "sh"],
            style: {
              color: "#eceff4", // White for punctuation
            },
          },
        ],
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
        type: "model",
        href: "https://docs.zerops.io/llms.txt",
      },
      {
        type: "discord",
        href: "https://docs.zerops.io/discord",
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
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
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
        blog: {
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
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
