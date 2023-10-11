/**
 * Custom sidebar definitions:
 * - To declare a sidebar element as part of the homepage sidebar, add className: 'homepage-sidebar-item'
 * - To add an icon:
 *   - add the icon in www/docs/src/theme/Icon/<IconName>/index.ts as a React SVG element if it doesn't exist, where `<IconName>` is the camel case name of the icon
 *   - add the mapping to the icon in www/docs/src/theme/Icon/index.js
 *   - add in customProps sidebar_icon: 'icon-name'
 * - To add a group divider add in customProps sidebar_is_group_divider: true and set the label/value to the title that should appear in the divider.
 * - To add a back item, add in customProps:
 *   - sidebar_is_back_link: true
 *   - sidebar_icon: `back-arrow`
 * - To add a sidebar title, add in customProps sidebar_is_title: true
 * - To add a group headline, add in customProps sidebar_is_group_headline: true
 * - To add a coming soon link (with a badge), add in customProps sidebar_is_soon: true
 */

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  homepage: [
    {
      type: "doc",
      id: "homepage",
      label: "Introduction",
      customProps: {
        sidebar_icon: "book-open",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "getting-started",
      label: "Getting started",
      customProps: {
        sidebar_icon: "rocket-launch",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "html",
      value: "Features",
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/infrastructure",
      label: "Projects & services",
      customProps: {
        sidebar_icon: "server-stack",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/pipeline",
      label: "Prepare, build, deploy pipeline",
      customProps: {
        sidebar_icon: "circle-stack",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/scaling-ha",
      label: "Automatic scaling & High Availability",
      customProps: {
        sidebar_icon: "adjustments",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/access",
      label: "Custom domains & IP accesss",
      customProps: {
        sidebar_icon: "globe-europe",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/env-variables",
      label: "Environment variables",
      customProps: {
        sidebar_icon: "tools",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/remote-dev",
      label: "Local & remote development",
      customProps: {
        sidebar_icon: "computer-desktop-solid",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/developer-first",
      label: "Developer first",
      customProps: {
        sidebar_icon: "heart",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "html",
      value: "Perfercly suited for",
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "category",
      label: "Nest.js",
      link: {
        type: "doc",
        id: "frameworks/nestjs/index",
      },
      customProps: {
        sidebar_icon: "nestjs",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/nestjs/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "category",
      label: "Laravel",
      link: {
        type: "doc",
        id: "frameworks/laravel/index",
      },
      customProps: {
        sidebar_icon: "laravel",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/laravel/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "category",
      label: "Gingonic",
      link: {
        type: "doc",
        id: "frameworks/gingonic/index",
      },
      customProps: {
        sidebar_icon: "gingonic",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/gingonic/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "category",
      label: "Nette",
      link: {
        type: "doc",
        id: "frameworks/nette/index",
      },
      customProps: {
        sidebar_icon: "nette",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/nette/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "category",
      label: "Strapi",
      link: {
        type: "doc",
        id: "frameworks/strapi/index",
      },
      customProps: {
        sidebar_icon: "strapi",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/strapi/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "category",
      label: "Medusa",
      link: {
        type: "doc",
        id: "frameworks/medusa/index",
      },
      customProps: {
        sidebar_icon: "medusa",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "frameworks/medusa/examples",
          label: "Examples",
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: "html",
      value: "All Supported Services",
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "category",
      label: "Runtimes, web servers & Linux containers",
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Node.js",
          customProps: {
            sidebar_icon: "nodejs",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "PHP",
          customProps: {
            sidebar_icon: "php",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Python",
          customProps: {
            sidebar_icon: "python",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Go",
          customProps: {
            sidebar_icon: "go",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: ".NET",
          customProps: {
            sidebar_icon: "dotnet",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Rust",
          customProps: {
            sidebar_icon: "rust",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Java",
          customProps: {
            sidebar_icon: "java",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
      ],
    },
    {
      type: "category",
      label: "Databases, search engines & message brokers",
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: "ref",
          id: "nodejs/overview",
          label: "PostgreSQL",
          customProps: {
            sidebar_icon: "postgresql",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "MariaDB (MySQL)",
          customProps: {
            sidebar_icon: "mariadb",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "MongoDB",
          customProps: {
            sidebar_icon: "mongodb",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Elasticsearch",
          customProps: {
            sidebar_icon: "elasticsearch",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "KeyDB (Redis)",
          customProps: {
            sidebar_icon: "keydb",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "RabbitMQ",
          customProps: {
            sidebar_icon: "rabbitmq",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
      ],
    },
    {
      type: "category",
      label: "Storages",
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Object Storage",
          customProps: {
            sidebar_icon: "cube-solid",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "nodejs/overview",
          label: "Shared storage",
          customProps: {
            sidebar_icon: "server",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
      ],
    },
    {
      type: "html",
      value: "References",
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "references/cli",
      label: "CLI",
      customProps: {
        sidebar_icon: "command-line",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "references/zeropsyml",
      label: "zerops.yml",
      customProps: {
        sidebar_icon: "document-text",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "references/import",
      label: "Import yaml",
      customProps: {
        sidebar_icon: "cloud-arrow-up",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "html",
      value: "Additional resources",
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "additional-resources/utility-recipes",
      label: "Utility recipes",
      customProps: {
        sidebar_icon: "swatch",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "additional-resources/glossary",
      label: "Glossary",
      customProps: {
        sidebar_icon: "list-bullet",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "additional-resources/roadmap",
      label: "Roadmap",
      customProps: {
        sidebar_icon: "map",
      },
      className: "homepage-sidebar-item",
    },
  ],
  nodejs: [
    {
      type: "ref",
      id: "homepage",
      label: "Back to home",
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: "back-arrow",
      },
    },
    {
      type: "doc",
      id: "nodejs/overview",
      label: "Zerops Node.js Service",
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: "nodejs",
      },
    },
    {
      type: "category",
      label: "How-to",
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: "doc",
          id: "nodejs/how-to/create",
          label: "Create Node.js service",
        },
        {
          type: "doc",
          id: "nodejs/how-to/env-variables",
          label: "Manage environment variables",
        },
        {
          type: "doc",
          id: "nodejs/how-to/build-pipeline",
          label: "Configure build & deploy pipeline",
        },
        {
          type: "doc",
          id: "nodejs/how-to/repo-connect",
          label: "Connect GitHub / GitLab repository",
        },
        {
          type: "doc",
          id: "nodejs/how-to/trigger-pipeline",
          label: "Trigger build pipeline",
        },
        {
          type: "doc",
          id: "nodejs/how-to/customize-runtime",
          label: "Customize Node.js runtime",
        },
        {
          type: "doc",
          id: "nodejs/how-to/logs",
          label: "Setup & accesss logs",
        },
        {
          type: "doc",
          id: "nodejs/how-to/filebrowser",
          label: "Browse container files",
        },
        {
          type: "doc",
          id: "nodejs/how-to/access",
          label: "Access Node.js runtime service",
        },
        {
          type: "doc",
          id: "nodejs/how-to/scaling",
          label: "Scale Node.js runtime service",
        },
        {
          type: "doc",
          id: "nodejs/how-to/controls",
          label: "Stop & start Node.js runtime service",
        },
        {
          type: "doc",
          id: "nodejs/how-to/ports",
          label: "Update open ports",
        },
        {
          type: "doc",
          id: "nodejs/how-to/shared-storage",
          label: "Connect / disconnect shared storage",
        },
        {
          type: "doc",
          id: "nodejs/how-to/delete",
          label: "Delete Node.js service",
        },
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: "doc",
          id: "nodejs/reference/import",
          label: "Import configuration",
        },
        {
          type: "doc",
          id: "nodejs/reference/cli",
          label: "CLI",
        },
      ],
    },
  ],
}
