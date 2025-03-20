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
      type: 'doc',
      id: 'homepage',
      label: 'Introduction',
      customProps: {
        sidebar_icon: 'book-open',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'html',
      value: 'Features',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'features/infrastructure',
      },
      label: 'Projects, Services & Containers',
      customProps: {
        sidebar_icon: 'server-stack',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'features/container-vs-vm',
          label: 'Containers vs VMs',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'features/pipeline',
      },
      label: 'Prepare, Build, Deploy Pipeline',
      customProps: {
        sidebar_icon: 'circle-stack',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'features/build-cache',
          label: 'Build Cache',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
        {
          type: 'doc',
          id: 'references/debug-mode',
          label: 'Debug Mode',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'features/scaling-ha',
      label: 'Automatic Scaling & High Availability',
      customProps: {
        sidebar_icon: 'adjustments',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'features/access',
      },
      label: 'Custom Domains & IP Access',
      customProps: {
        sidebar_icon: 'globe-europe',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'features/dns',
          label: 'DNS & Proxy Setup',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'features/env-variables',
      label: 'Environment Variables',
      customProps: {
        sidebar_icon: 'tools',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'features/pricing',
      },
      label: 'Pricing Plans & Calculator',
      customProps: {
        sidebar_icon: 'currency-dollar',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'features/payment',
          label: 'Top-up & Billing',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'features/backup',
      label: 'Backup',
      customProps: {
        sidebar_icon: 'archive-box',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'html',
      value: 'Perfectly suited for',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'ref',
      id: 'frameworks/laravel',
      label: 'Laravel',
      customProps: {
        sidebar_icon: 'laravel',
      },
      className: 'homepage-sidebar-item  service-sidebar-item',
    },
    {
      type: 'html',
      value: 'All Supported Services',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      label: 'Runtimes & Web Servers',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'ref',
          id: 'nodejs/overview',
          label: 'Node.js',
          customProps: {
            sidebar_icon: 'nodejs',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'php/overview',
          label: 'PHP',
          customProps: {
            sidebar_icon: 'php',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'python/overview',
          label: 'Python',
          customProps: {
            sidebar_icon: 'python',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'go/overview',
          label: 'Go',
          customProps: {
            sidebar_icon: 'go',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'dotnet/overview',
          label: '.NET',
          customProps: {
            sidebar_icon: 'dotnet',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'rust/overview',
          label: 'Rust',
          customProps: {
            sidebar_icon: 'rust',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'java/overview',
          label: 'Java',
          customProps: {
            sidebar_icon: 'java',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'deno/overview',
          label: 'Deno',
          customProps: {
            sidebar_icon: 'deno',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'bun/overview',
          label: 'Bun',
          customProps: {
            sidebar_icon: 'bun',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'elixir/overview',
          label: 'Elixir',
          customProps: {
            sidebar_icon: 'elixir',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'gleam/overview',
          label: 'Gleam',
          customProps: {
            sidebar_icon: 'gleam',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'nginx/overview',
          label: 'Nginx static',
          customProps: {
            sidebar_icon: 'nginx',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'static/overview',
          label: 'Static',
          customProps: {
            sidebar_icon: 'computer-desktop',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },

      ],
    },
    {
      type: 'category',
      label: 'Linux Containers & VMs',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
//        {
//          type: 'ref',
//          id: 'ubuntu/overview',
//          label: 'Ubuntu',
//          customProps: {
//            sidebar_icon: 'ubuntu',
//            sidebar_is_soon: true,
//          },
//          className: 'homepage-sidebar-item  service-sidebar-item',
//        },
//        {
//          type: 'ref',
//          id: 'alpine/overview',
//          label: 'Alpine',
//          customProps: {
//            sidebar_icon: 'alpine',
//            sidebar_is_soon: true,
//          },
//          className: 'homepage-sidebar-item  service-sidebar-item',
//        },
            {
              type: 'ref',
              id: 'docker/overview',
              label: 'Docker',
              customProps: {
                sidebar_icon: 'docker',
              },
              className: 'homepage-sidebar-item  service-sidebar-item',
            },
      ],
    },
    {
      type: 'category',
      label: 'Databases, Search Engines & Message Brokers',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'ref',
          id: 'postgresql/overview',
          label: 'PostgreSQL',
          customProps: {
            sidebar_icon: 'postgresql',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'mariadb/overview',
          label: 'MariaDB (MySQL)',
          customProps: {
            sidebar_icon: 'mariadb',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'keydb/overview',
          label: 'KeyDB (Redis)',
          customProps: {
            sidebar_icon: 'keydb',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: "ref",
          id: "elasticsearch/overview",
          label: "Elasticsearch",
          customProps: {
            sidebar_icon: "elasticsearch",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "typesense/overview",
          label: "Typesense",
          customProps: {
            sidebar_icon: "typesense",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "meilisearch/overview",
          label: "Meilisearch",
          customProps: {
            sidebar_icon: "meilisearch",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
        {
          type: "ref",
          id: "qdrant/overview",
          label: "Qdrant",
          customProps: {
            sidebar_icon: "qdrant",
          },
          className: "homepage-sidebar-item  service-sidebar-item",
        },
//        {
//          type: "ref",
//          id: "valkey/overview",
//          label: "Valkey",
//          customProps: {
//            sidebar_icon: "valkey",
//          },
//          className: "homepage-sidebar-item  service-sidebar-item",
//        },
//        {
//          type: "ref",
//          id: "kafka/overview",
//          label: "Kafka",
//          customProps: {
//            sidebar_icon: "kafka",
//          },
//          className: "homepage-sidebar-item  service-sidebar-item",
//        },
//        {
//          type: "ref",
//          id: "nats/overview",
//          label: "NATS",
//          customProps: {
//            sidebar_icon: "nats",
//          },
//          className: "homepage-sidebar-item  service-sidebar-item",
//        },
      ],
    },
    {
      type: 'category',
      label: 'Storages',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'ref',
          id: 'object-storage/overview',
          label: 'Object Storage',
          customProps: {
            sidebar_icon: 'cube-solid',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
        {
          type: 'ref',
          id: 'shared-storage/overview',
          label: 'Shared Storage',
          customProps: {
            sidebar_icon: 'server',
          },
          className: 'homepage-sidebar-item  service-sidebar-item',
        },
      ],
    },
    {
      type: 'html',
      value: 'Zerops.yml',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'zerops-yaml/specification',
      label: 'Specification',
      customProps: {
        sidebar_icon: 'document-text',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'zerops-yaml/base-list',
      label: 'Base List',
      customProps: {
        sidebar_icon: 'swatch',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'zerops-yaml/cron',
      label: 'Cron',
      customProps: {
        sidebar_icon: 'arrow-path',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'html',
      value: 'References',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      label: 'zCLI',
      link: {
        type: 'doc',
        id: 'references/cli',
      },
      customProps: {
        sidebar_icon: 'window',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'references/cli/commands',
          label: 'Available Commands',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
        {
          type: 'doc',
          id: 'references/cli/access-logs',
          label: 'Access Logs',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'references/ssh',
      label: 'SSH',
      customProps: {
        sidebar_icon: 'command-line',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      label: 'Zsc',
      id: 'references/zsc',
      customProps: {
        sidebar_icon: 'window',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      label: 'VPN',
      link: {
        type: 'doc',
        id: 'references/vpn',
      },
      customProps: {
        sidebar_icon: 'globe-europe',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'references/vpn/troubleshooting',
          label: 'Troubleshooting',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'category',
      label: 'Import & Export File',
      link: {
        type: 'doc',
        id: 'references/import',
      },
      customProps: {
        sidebar_icon: 'cloud-arrow-up',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'references/import-yaml/pre-processor',
          label: 'Yaml Preprocessing',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
        {
          type: 'doc',
          id: 'references/import-yaml/type-list',
          label: 'Service Types',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'references/github-integration',
      label: 'Github Integration',
      customProps: {
        sidebar_icon: 'github',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'references/gitlab-integration',
      label: 'Gitlab Integration',
      customProps: {
        sidebar_icon: 'gitlab',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'references/firewall',
      label: 'Firewall',
      customProps: {
        sidebar_icon: 'firewall',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'references/smtp',
      label: 'SMTP',
      customProps: {
        sidebar_icon: 'envelope',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'references/api',
      label: 'API',
      customProps: {
        sidebar_icon: 'curly-braces',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'html',
      value: 'Help',
      customProps: {
        sidebar_is_group_divider: true,
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'help/faq',
      label: 'FAQ',
      customProps: {
        sidebar_icon: 'question-mark',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'help/contacts',
      label: 'Contacts',
      customProps: {
        sidebar_icon: 'chat-bubble-left-right',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'help/branding',
      label: 'Branding',
      customProps: {
        sidebar_icon: 'document-text',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'html',
      value: 'Additional resources',
      customProps: {
        sidebar_is_group_divider: true,
        sidebar_is_soon: true,
      },
      className: 'homepage-sidebar-item',
    },
    //    {
    //      type: "doc",
    //      id: "additional-resources/utility-recipes",
    //      label: "Utility recipes",
    //      customProps: {
    //        sidebar_icon: "swatch",
    //      },
    //      className: "homepage-sidebar-item",
    //    },
    //    {
    //      type: "doc",
    //      id: "additional-resources/glossary",
    //      label: "Glossary",
    //      customProps: {
    //        sidebar_icon: "list-bullet",
    //      },
    //      className: "homepage-sidebar-item",
    //    },
    //    {
    //      type: "doc",
    //      id: "additional-resources/roadmap",
    //      label: "Roadmap",
    //      customProps: {
    //        sidebar_icon: "map",
    //      },
    //      className: "homepage-sidebar-item",
    //    },
  ],
  nodejs: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'nodejs/overview',
      label: 'Node.js',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'nodejs',
      },
    },
    {
      type: 'category',
      label: 'Management',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'nodejs/how-to/create',
          label: 'Create Node.js service',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/upgrade',
          label: 'Upgrade Node.js service',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/delete',
          label: 'Delete Node.js service',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/controls',
          label: 'Stop & start Node.js runtime service',
        },
      ],
    },
    {
      type: 'category',
      label: 'Configuration & Environment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'nodejs/how-to/env-variables',
          label: 'Manage environment variables',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/customize-runtime',
          label: 'Customize NodeJS runtime',
        },
      ],
    },
    {
      type: 'category',
      label: 'Build & Deployment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'nodejs/how-to/build-pipeline',
          label: 'Configure build & deploy pipeline',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/trigger-pipeline',
          label: 'Trigger build pipeline',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/build-process',
          label: 'Build process',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/deploy-process',
          label: 'Deploy process',
        },
      ],
    },
    {
      type: 'category',
      label: 'Maintenance & Monitoring',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'nodejs/how-to/logs',
          label: 'Setup & access logs',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/filebrowser',
          label: 'Browse container files',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/access',
          label: 'Access Node.js runtime service',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/scaling',
          label: 'Scale Node.js runtime service',
        },
        {
          type: 'doc',
          id: 'nodejs/how-to/shared-storage',
          label: 'Connect / disconnect shared storage',
        },
      ],
    },
  ],
  php: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'php/overview',
      label: 'PHP',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'php',
      },
    },
    {
      type: 'category',
      label: 'Management',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'php/how-to/create',
          label: 'Create PHP service',
        },
        {
          type: 'doc',
          id: 'php/how-to/upgrade',
          label: 'Upgrade PHP service',
        },
        {
          type: 'doc',
          id: 'php/how-to/delete',
          label: 'Delete PHP service',
        },
        {
          type: 'doc',
          id: 'php/how-to/controls',
          label: 'Stop & start PHP runtime service',
        },
      ],
    },
    {
      type: 'category',
      label: 'Configuration & Environment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'php/how-to/env-variables',
          label: 'Manage environment variables',
        },
        {
          type: 'doc',
          id: 'php/how-to/customize-runtime',
          label: 'Customize PHP runtime',
        },
        {
          type: 'doc',
          id: 'php/how-to/customize-web-server',
          label: 'Customize web server',
        },
      ],
    },
    {
      type: 'category',
      label: 'Build & Deployment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'php/how-to/build-pipeline',
          label: 'Configure build & deploy pipeline',
        },
        {
          type: 'doc',
          id: 'php/how-to/trigger-pipeline',
          label: 'Trigger build pipeline',
        },
        {
          type: 'doc',
          id: 'php/how-to/build-process',
          label: 'Build process',
        },
        {
          type: 'doc',
          id: 'php/how-to/deploy-process',
          label: 'Deploy process',
        },
      ],
    },
    {
      type: 'category',
      label: 'Maintenance & Monitoring',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'php/how-to/logs',
          label: 'Setup & access logs',
        },
        {
          type: 'doc',
          id: 'php/how-to/filebrowser',
          label: 'Browse container files',
        },
        {
          type: 'doc',
          id: 'php/how-to/access',
          label: 'Access PHP runtime service',
        },
        {
          type: 'doc',
          id: 'php/how-to/scaling',
          label: 'Scale PHP runtime service',
        },
        {
          type: 'doc',
          id: 'php/how-to/shared-storage',
          label: 'Connect / disconnect shared storage',
        },
      ],
    },
  ],
  python: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'python/overview',
      label: 'Python',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'python',
      },
    },
    {
      type: 'category',
      label: 'Management',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'python/how-to/create',
          label: 'Create Python service',
        },
        {
          type: 'doc',
          id: 'python/how-to/upgrade',
          label: 'Upgrade Python service',
        },
        {
          type: 'doc',
          id: 'python/how-to/delete',
          label: 'Delete Python service',
        },
        {
          type: 'doc',
          id: 'python/how-to/controls',
          label: 'Stop & start Python runtime service',
        },
      ],
    },
    {
      type: 'category',
      label: 'Configuration & Environment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'python/how-to/env-variables',
          label: 'Manage environment variables',
        },
        {
          type: 'doc',
          id: 'python/how-to/customize-runtime',
          label: 'Customize Python runtime',
        },
      ],
    },
    {
      type: 'category',
      label: 'Build & Deployment',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'python/how-to/build-pipeline',
          label: 'Configure build & deploy pipeline',
        },
        {
          type: 'doc',
          id: 'python/how-to/trigger-pipeline',
          label: 'Trigger build pipeline',
        },
        {
          type: 'doc',
          id: 'python/how-to/build-process',
          label: 'Build process',
        },
        {
          type: 'doc',
          id: 'python/how-to/deploy-process',
          label: 'Deploy process',
        },
      ],
    },
    {
      type: 'category',
      label: 'Maintenance & Monitoring',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'python/how-to/logs',
          label: 'Setup & access logs',
        },
        {
          type: 'doc',
          id: 'python/how-to/filebrowser',
          label: 'Browse container files',
        },
        {
          type: 'doc',
          id: 'python/how-to/access',
          label: 'Access Python runtime service',
        },
        {
          type: 'doc',
          id: 'python/how-to/scaling',
          label: 'Scale Python runtime service',
        },
        {
          type: 'doc',
          id: 'python/how-to/shared-storage',
          label: 'Connect / disconnect shared storage',
        },
      ],
    },
  ],
  go: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'go/overview',
        label: 'Go',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'go',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'go/how-to/create',
            label: 'Create Go service',
          },
          {
            type: 'doc',
            id: 'go/how-to/upgrade',
            label: 'Upgrade Go service',
          },
          {
            type: 'doc',
            id: 'go/how-to/delete',
            label: 'Delete Go service',
          },
          {
            type: 'doc',
            id: 'go/how-to/controls',
            label: 'Stop & start Go runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'go/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'go/how-to/customize-runtime',
            label: 'Customize Go runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'go/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'go/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'go/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'go/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'go/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'go/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'go/how-to/access',
            label: 'Access Go runtime service',
          },
          {
            type: 'doc',
            id: 'go/how-to/scaling',
            label: 'Scale Go runtime service',
          },
          {
            type: 'doc',
            id: 'go/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  rust: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'rust/overview',
        label: 'Rust',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'rust',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'rust/how-to/create',
            label: 'Create Rust service',
          },
          {
            type: 'doc',
            id: 'rust/how-to/upgrade',
            label: 'Upgrade Rust service',
          },
          {
            type: 'doc',
            id: 'rust/how-to/delete',
            label: 'Delete Rust service',
          },
          {
            type: 'doc',
            id: 'rust/how-to/controls',
            label: 'Stop & start Rust runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'rust/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'rust/how-to/customize-runtime',
            label: 'Customize Rust runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'rust/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'rust/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'rust/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'rust/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'rust/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'rust/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'rust/how-to/access',
            label: 'Access Rust runtime service',
          },
          {
            type: 'doc',
            id: 'rust/how-to/scaling',
            label: 'Scale Rust runtime service',
          },
          {
            type: 'doc',
            id: 'rust/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
    dotnet: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'dotnet/overview',
        label: '.NET',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'dotnet',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'dotnet/how-to/create',
            label: 'Create .NET service',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/upgrade',
            label: 'Upgrade .NET service',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/delete',
            label: 'Delete .NET service',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/controls',
            label: 'Stop & start .NET runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'dotnet/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/customize-runtime',
            label: 'Customize .NET runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'dotnet/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'dotnet/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/access',
            label: 'Access .NET runtime service',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/scaling',
            label: 'Scale .NET runtime service',
          },
          {
            type: 'doc',
            id: 'dotnet/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  java: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'java/overview',
        label: 'Java',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'java',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'java/how-to/create',
            label: 'Create Java service',
          },
          {
            type: 'doc',
            id: 'java/how-to/upgrade',
            label: 'Upgrade Java service',
          },
          {
            type: 'doc',
            id: 'java/how-to/delete',
            label: 'Delete Java service',
          },
          {
            type: 'doc',
            id: 'java/how-to/controls',
            label: 'Stop & start Java runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'java/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'java/how-to/customize-runtime',
            label: 'Customize Java runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'java/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'java/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'java/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'java/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'java/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'java/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'java/how-to/access',
            label: 'Access Java runtime service',
          },
          {
            type: 'doc',
            id: 'java/how-to/scaling',
            label: 'Scale Java runtime service',
          },
          {
            type: 'doc',
            id: 'java/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  nginx: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'nginx/overview',
        label: 'Nginx Static',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'nginx',
        },
      },
      {
        type: 'category',
        label: 'Dive-in',
        collapsible: false,
        link: {
          type: 'doc',
          id: 'nginx/getting-started',
        },
        customProps: {
          sidebar_icon: 'rocket-launch',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'nginx/tutorial/quickstart',
            label: 'Quickstart',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'nginx/tutorial/step-by-step',
            label: 'Step-by-step tutorial',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
        ],
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'nginx/how-to/create',
            label: 'Create Nginx static service',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/upgrade',
            label: 'Upgrade Nginx service',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/delete',
            label: 'Delete Nginx static service',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/controls',
            label: 'Stop & start Nginx static service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'nginx/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/customize-runtime',
            label: 'Customize Nginx static runtime',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/customize-web-server',
            label: 'Customize web server',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'nginx/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'nginx/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/access',
            label: 'Access Nginx runtime service',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/scaling',
            label: 'Scale Nginx static service',
          },
          {
            type: 'doc',
            id: 'nginx/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
      {
        type: 'doc',
        id: 'nginx/faq',
        label: 'FAQ',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'chat-bubble-left-right',
        },
      },
    ],
  static: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'static/overview',
      label: 'Static Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'computer-desktop',
      },
    },
  ],
  docker: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'docker/overview',
      label: 'Docker Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'docker',
      },
    },
  ],
  mariadb: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'mariadb/overview',
      label: 'Zerops MariaDB Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'mariadb',
      },
    },
    {
      type: 'category',
      label: 'How-to',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'mariadb/how-to/create',
          label: 'Create MariaDB service',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/connect',
          label: 'Connect to MariaDB',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/manage',
          label: 'Manage users and databases',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/export-import-data',
          label: 'Export and import data',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/backup',
          label: 'Backup data',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/scale',
          label: 'Scale MariaDB service',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/control',
          label: 'Stop and start MariaDB service',
        },
        {
          type: 'doc',
          id: 'mariadb/how-to/delete',
          label: 'Delete MariaDB service',
        },
      ],
    },
    {
      type: 'category',
      label: 'Technical details',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'mariadb/tech-details/cluster',
          label: 'MariaDB cluster asynchronous behaviour',
        },
        {
          type: 'doc',
          id: 'mariadb/tech-details/limitations',
          label: 'Technical limitations of MariaDB cluster',
        },
      ],
    },
    // {
    //   type: 'doc',
    //   id: 'mariadb/faq',
    //   label: 'FAQ',
    //   customProps: {
    //     sidebar_is_title: true,
    //     sidebar_icon: 'chat-bubble-left-right',
    //   },
    // },
  ],
  postgresql: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'postgresql/overview',
      label: 'Zerops PostgreSQL Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'postgresql',
      },
    },
    {
      type: 'category',
      label: 'How-to',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'postgresql/how-to/create',
          label: 'Create PostgreSQL service',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/connect',
          label: 'Connect to PostgreSQL',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/manage',
          label: 'Manage users, databases & plugins',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/export-import-data',
          label: 'Export and import data',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/scale',
          label: 'Scale PostgreSQL service',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/control',
          label: 'Stop and start PostgreSQL service',
        },
        {
          type: 'doc',
          id: 'postgresql/how-to/delete',
          label: 'Delete PostgreSQL service',
        },
      ],
    },
    //    {
    //      type: "category",
    //      label: "Technical details",
    //      collapsible: false,
    //      customProps: {
    //        sidebar_is_group_headline: true,
    //      },
    //      items: [
    //        {
    //          type: "doc",
    //          id: "postgresql/tech-details/cluster",
    //          label: "PostgreSQL cluster asynchronous behaviour",
    //        },
    //        {
    //          type: "doc",
    //          id: "postgresql/tech-details/limitations",
    //          label: "Technical limitations of PostgreSQL cluster",
    //        },
    //      ],
    //    },
    {
      type: 'doc',
      id: 'postgresql/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
  ],
//  mongodb: [
//    {
//      type: 'ref',
//      id: 'homepage',
//      label: 'Back to home',
//      customProps: {
//        sidebar_is_back_link: true,
//        sidebar_icon: 'back-arrow',
//      },
//    },
  // {
  //   type: 'doc',
  //   id: 'mongodb/overview',
  //   label: 'Zerops MongoDB Service',
  //   customProps: {
  //     sidebar_is_title: true,
  //     sidebar_icon: 'mongodb',
  //   },
  // },
//  ],
  elasticsearch: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'elasticsearch/overview',
      label: 'Zerops Elasticsearch Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'elasticsearch',
      },
    },
  ],
  keydb: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'keydb/overview',
      label: 'Zerops KeyDB Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'keydb',
      },
    },
    {
      type: 'category',
      label: 'How-to',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'keydb/how-to/create',
          label: 'Create KeyDB service',
        },
        {
          type: 'doc',
          id: 'keydb/how-to/connect',
          label: 'Connect to KeyDB',
        },
        {
          type: 'doc',
          id: 'keydb/how-to/manage',
          label: 'Manage users and databases',
        },
        {
          type: 'doc',
          id: 'keydb/how-to/scale',
          label: 'Scale KeyDB service',
        },
        {
          type: 'doc',
          id: 'keydb/how-to/control',
          label: 'Stop and start KeyDB service',
        },
        {
          type: 'doc',
          id: 'keydb/how-to/delete',
          label: 'Delete KeyDB service',
        },
      ],
    },
    // {
    //   type: 'doc',
    //   id: 'keydb/faq',
    //   label: 'FAQ',
    //   customProps: {
    //     sidebar_is_title: true,
    //     sidebar_icon: 'chat-bubble-left-right',
    //   },
    // },
  ],
  typesense: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'typesense/overview',
      label: 'Zerops Typesense Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'typesense',
      },
    },
  ],
  meilisearch: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'meilisearch/overview',
      label: 'Zerops Meilisearch Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'meilisearch',
      },
    },
  ],
  qdrant: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'qdrant/overview',
      label: 'Zerops Qdrant Service',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'qdrant',
      },
    },
  ],
  //  rabbitmq: [
  //    {
  //      type: "ref",
  //      id: "homepage",
  //      label: "Back to home",
  //      customProps: {
  //        sidebar_is_back_link: true,
  //        sidebar_icon: "back-arrow",
  //      },
  //    },
  //    {
  //      type: "doc",
  //      id: "rabbitmq/overview",
  //      label: "Zerops RabbitMQ Service",
  //      customProps: {
  //        sidebar_is_title: true,
  //        sidebar_icon: "rabbitmq",
  //      },
  //    },
  //    {
  //      type: "category",
  //      label: "How-to",
  //      collapsible: false,
  //      customProps: {
  //        sidebar_is_group_headline: true,
  //      },
  //      items: [
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/create",
  //          label: "Create RabbitMQ service",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/connect",
  //          label: "Connect to RabbitMQ",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/manage",
  //          label: "Manage users and databases",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/export-import-data",
  //          label: "Export and import data",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/scale",
  //          label: "Scale RabbitMQ service",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/control",
  //          label: "Stop and start RabbitMQ service",
  //        },
  //        {
  //          type: "doc",
  //          id: "rabbitmq/how-to/delete",
  //          label: "Delete RabbitMQ service",
  //        },
  //      ],
  //    },
  //  ],
  sharedstorage: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'shared-storage/overview',
      label: 'Shared storage overview',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'server',
      },
    },
    {
      type: 'category',
      label: 'How-to',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
        sidebar_icon: 'academic-cap-solid',
      },
      items: [
        {
          type: 'doc',
          id: 'shared-storage/how-to/create',
          label: 'Create shared storage',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/connect',
          label: 'Connect shared storage',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/use',
          label: 'Usage & Limitations',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/manage',
          label: 'Manage & Access shared storage',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/backup',
          label: 'Backup shared storage',
        },
      ],
    },
    {
      type: 'doc',
      id: 'shared-storage/tech-details',
      label: 'Technical details',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'document-text',
      },
    },
  ],
  objectstorage: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'object-storage/overview',
      label: 'Object Storage Overview',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'server',
      },
    },
    {
      type: 'category',
      label: 'How-to',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
        sidebar_icon: 'academic-cap-solid',
      },
      items: [
        {
          type: 'doc',
          id: 'object-storage/how-to/create',
          label: 'Create object storage service',
        },
        {
          type: 'doc',
          id: 'object-storage/how-to/update-bucket',
          label: 'Change bucket size or access policy',
        },
        {
          type: 'doc',
          id: 'object-storage/how-to/access',
          label: 'Access object storage service',
        },
        {
          type: 'doc',
          id: 'object-storage/how-to/delete',
          label: 'Delete object storage service',
        },
        {
          type: 'doc',
          id: 'object-storage/how-to/curl-file',
          label: 'Download file from a private bucket',
        },
      ],
    },
  ],
  deno: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'deno/overview',
        label: 'Getting Started',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'deno',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'deno/how-to/create',
            label: 'Create Deno service',
          },
          {
            type: 'doc',
            id: 'deno/how-to/upgrade',
            label: 'Upgrade Deno service',
          },
          {
            type: 'doc',
            id: 'deno/how-to/delete',
            label: 'Delete Deno service',
          },
          {
            type: 'doc',
            id: 'deno/how-to/controls',
            label: 'Stop & start Deno runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'deno/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'deno/how-to/customize-runtime',
            label: 'Customize Deno runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'deno/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'deno/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'deno/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'deno/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'deno/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'deno/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'deno/how-to/access',
            label: 'Access Bun runtime service',
          },
          {
            type: 'doc',
            id: 'deno/how-to/scaling',
            label: 'Scale Deno runtime service',
          },
          {
            type: 'doc',
            id: 'deno/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  bun: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'bun/overview',
        label: 'Getting Started',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'bun',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'bun/how-to/create',
            label: 'Create Bun service',
          },
          {
            type: 'doc',
            id: 'bun/how-to/upgrade',
            label: 'Upgrade Bun service',
          },
          {
            type: 'doc',
            id: 'bun/how-to/delete',
            label: 'Delete Bun service',
          },
          {
            type: 'doc',
            id: 'bun/how-to/controls',
            label: 'Stop & start Bun runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'bun/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'bun/how-to/customize-runtime',
            label: 'Customize Bun runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'bun/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'bun/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'bun/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'bun/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'bun/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'bun/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'bun/how-to/access',
            label: 'Access Bun runtime service',
          },
          {
            type: 'doc',
            id: 'bun/how-to/scaling',
            label: 'Scale Bun runtime service',
          },
          {
            type: 'doc',
            id: 'bun/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  gleam: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'gleam/overview',
        label: 'Getting Started',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'gleam',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'gleam/how-to/create',
            label: 'Create Gleam service',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/upgrade',
            label: 'Upgrade Gleam service',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/delete',
            label: 'Delete Gleam service',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/controls',
            label: 'Stop & start Gleam runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'gleam/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/customize-runtime',
            label: 'Customize Gleam runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'gleam/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'gleam/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/access',
            label: 'Access Gleam runtime service',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/scaling',
            label: 'Scale Gleam runtime service',
          },
          {
            type: 'doc',
            id: 'gleam/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  elixir: [
      {
        type: 'ref',
        id: 'homepage',
        label: 'Back to home',
        customProps: {
          sidebar_is_back_link: true,
          sidebar_icon: 'back-arrow',
        },
      },
      {
        type: 'doc',
        id: 'elixir/overview',
        label: 'Getting Started',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'elixir',
        },
      },
      {
        type: 'category',
        label: 'Management',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'elixir/how-to/create',
            label: 'Create Elixir service',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/upgrade',
            label: 'Upgrade Elixir service',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/delete',
            label: 'Delete Elixir service',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/controls',
            label: 'Stop & start Elixir runtime service',
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'elixir/how-to/env-variables',
            label: 'Manage environment variables',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/customize-runtime',
            label: 'Customize Elixir runtime',
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'elixir/how-to/build-pipeline',
            label: 'Configure build & deploy pipeline',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/trigger-pipeline',
            label: 'Trigger build pipeline',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/build-process',
            label: 'Build process',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/deploy-process',
            label: 'Deploy process',
          },
        ],
      },
      {
        type: 'category',
        label: 'Maintenance & Monitoring',
        collapsible: false,
        customProps: {
          sidebar_is_group_headline: true,
        },
        items: [
          {
            type: 'doc',
            id: 'elixir/how-to/logs',
            label: 'Setup & access logs',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/filebrowser',
            label: 'Browse container files',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/access',
            label: 'Access Elixir runtime service',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/scaling',
            label: 'Scale Elixir runtime service',
          },
          {
            type: 'doc',
            id: 'elixir/how-to/shared-storage',
            label: 'Connect / disconnect shared storage',
          },
        ],
      },
    ],
  laravel: [
    {
      type: 'ref',
      id: 'homepage',
      label: 'Back to home',
      customProps: {
        sidebar_is_back_link: true,
        sidebar_icon: 'back-arrow',
      },
    },
    {
      type: 'doc',
      id: 'frameworks/laravel',
      label: 'Laravel',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'laravel',
      },
    },
    {
      type: 'doc',
      id: 'frameworks/laravel/introduction',
      label: 'Quickstart Guide',
      customProps: {
        sidebar_icon: 'rocket-launch',
      },
    },
    {
      type: 'category',
      label: 'Features',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'frameworks/laravel/env-variables',
          label: 'Environment Variables',
        },
//        {
//          type: 'doc',
//          id: 'frameworks/laravel/local-development',
//          label: 'Local Development',
//        },
        {
          type: 'doc',
          id: 'frameworks/laravel/migrations',
          label: 'Database Migrations',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/redis',
          label: 'Cache & Queue with Redis',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/cron',
          label: 'Schedule Jobs & CRON',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/smtp',
          label: 'SMTP Configuration',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/logs',
          label: 'Logs',
        },
      ],
    },
      {
        type: 'html',
        value: 'Recipes',
        customProps: {
          sidebar_is_group_divider: true,
        },
        className: 'homepage-sidebar-item',
      },
    {
      type: 'category',
      label: 'Minimal',
      collapsible: true,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/minimal-local',
          label: 'Local Development',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/minimal-devel',
          label: 'Stage Environment',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/minimal-prod',
          label: 'Production',
        },
      ],
    },
    {
      type: 'category',
      label: 'Jetstream',
      collapsible: true,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/jetstream-local',
          label: 'Local Development',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/jetstream-devel',
          label: 'Stage Environment',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/jetstream-prod',
          label: 'Production',
        },
      ],
    },
    {
      type: 'category',
      label: 'Filament',
      collapsible: true,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/filament-local',
          label: 'Local Development',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/filament-devel',
          label: 'Stage Environment',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/filament-prod',
          label: 'Production',
        },
      ],
    },
    {
      type: 'category',
      label: 'Twill CMS',
      collapsible: true,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/twill-local',
          label: 'Local Development',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/twill-devel',
          label: 'Stage Environment',
        },
        {
          type: 'doc',
          id: 'frameworks/laravel/recipes/twill-prod',
          label: 'Production',
        },
      ],
    },
    {
      type: 'doc',
      id: 'frameworks/laravel/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
  ],
};
