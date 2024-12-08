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
      type: 'doc',
      id: 'features/infrastructure',
      label: 'Projects & services',
      customProps: {
        sidebar_icon: 'server-stack',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'category',
      link: {
        type: 'doc',
        id: 'features/pipeline',
      },
      label: 'Prepare, build, deploy pipeline',
      customProps: {
        sidebar_icon: 'circle-stack',
      },
      className: 'homepage-sidebar-item',
      items: [
        {
          type: 'doc',
          id: 'features/build-cache',
          label: 'Build cache',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
      ],
    },
    {
      type: 'doc',
      id: 'features/scaling-ha',
      label: 'Automatic scaling & High Availability',
      customProps: {
        sidebar_icon: 'adjustments',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'features/access',
      label: 'Custom domains & IP access',
      customProps: {
        sidebar_icon: 'globe-europe',
      },
      className: 'homepage-sidebar-item',
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
      type: 'doc',
      id: 'features/pricing',
      label: 'Pricing Plans & Usage',
      customProps: {
        sidebar_icon: 'currency-dollar',
      },
      className: 'homepage-sidebar-item',
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
      label: 'Runtimes, web servers & Linux containers',
      collapsible: true,
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
      ],
    },
    {
      type: 'category',
      label: 'Databases, search engines & message brokers',
      collapsible: true,
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
//        {
//          type: "ref",
//          id: "meilisearch/overview",
//          label: "Meilisearch",
//          customProps: {
//            sidebar_icon: "meilisearch",
//          },
//          className: "homepage-sidebar-item  service-sidebar-item",
//        },
//        {
//          type: "ref",
//          id: "qdrant/overview",
//          label: "Qdrant",
//          customProps: {
//            sidebar_icon: "qdrant",
//          },
//          className: "homepage-sidebar-item  service-sidebar-item",
//        },
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
      collapsible: true,
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
        value: 'Service actions',
        customProps: {
          sidebar_is_group_divider: true,
        },
        className: 'homepage-sidebar-item',
      },
      {
        type: 'category',
        label: 'Management',
        link: {
          type: 'doc',
          id: 'common/service-management',
        },
        customProps: {
          sidebar_icon: 'cog-six-tooth',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'common/management/create',
            label: 'Create service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/management/upgrade',
            label: 'Upgrade service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/management/delete',
            label: 'Delete service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/management/controls',
            label: 'Stop & start service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
        ],
      },
      {
        type: 'category',
        label: 'Configuration & Environment',
        link: {
          type: 'doc',
          id: 'common/configuration',
        },
        customProps: {
          sidebar_icon: 'adjustments',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'common/configuration/env-variables',
            label: 'Manage environmental variables',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/configuration/customize-runtime',
            label: 'Customize runtime',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
        ],
      },
      {
        type: 'category',
        label: 'Build & Deployment',
        link: {
          type: 'doc',
          id: 'common/build-deployment',
        },
        customProps: {
          sidebar_icon: 'rocket-launch',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'common/build-deployment/build-pipeline',
            label: 'Configure build & deploy pipeline',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/build-deployment/trigger-pipeline',
            label: 'Trigger build pipeline',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/build-deployment/build-process',
            label: 'Build process',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/build-deployment/deploy-process',
            label: 'Deploy process',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
        ],
      },
      {
        type: 'category',
        label: 'Monitoring & Maintenance',
        link: {
          type: 'doc',
          id: 'common/maintenance',
        },
        customProps: {
          sidebar_icon: 'tools',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'common/maintenance/logs',
            label: 'Set up & access logs',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/maintenance/filebrowser',
            label: 'Browse container files',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/maintenance/access',
            label: 'Access service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/maintenance/scaling',
            label: 'Scale service',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: 'common/maintenance/shared-storage',
            label: 'Connect/disconnect shared storage',
            customProps: {
              exclude_from_doc_list: false,
            },
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
      id: 'zerops-yml/specification',
      label: 'Specification',
      customProps: {
        sidebar_icon: 'document-text',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'zerops-yml/base-list',
      label: 'Base list',
      customProps: {
        sidebar_icon: 'swatch',
      },
      className: 'homepage-sidebar-item',
    },
    {
      type: 'doc',
      id: 'zerops-yml/cron',
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
          label: 'Available commands',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
        {
          type: 'doc',
          id: 'references/cli/access-logs',
          label: 'Access logs',
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
      label: 'Import file',
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
          id: 'references/importyml/pre-processor',
          label: 'Yaml Preprocessing',
          customProps: {
            exclude_from_doc_list: false,
          },
        },
        {
          type: 'doc',
          id: 'references/importyml/type-list',
          label: 'Service types',
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
        sidebar_icon: 'cloud-arrow-up',
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
  nodejs: createRuntimeCategory('nodejs', 'nodejs', 'Node.js'),
  php: createWebserverCategory('php', 'php', 'PHP'),
  python: createRuntimeCategory('python', 'python', 'Python'),
  go: createRuntimeCategory('go', 'go', 'Go'),
  rust: createRuntimeCategory('rust', 'rust', 'Rust'),
  dotnet: createRuntimeCategory('dotnet', 'dotnet', '.NET'),
  java: createRuntimeCategory('java', 'java', 'Java'),
  deno: createRuntimeCategory('deno', 'deno', 'Deno'),
  bun: createRuntimeCategory('bun', 'bun', 'Bun'),
  gleam: createRuntimeCategory('gleam', 'gleam', 'Gleam'),
  elixir: createRuntimeCategory('elixir', 'elixir', 'Elixir'),
  nginx: createWebserverCategory('nginx', 'nginx', 'Nginx'),
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
    {
      type: 'doc',
      id: 'mariadb/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
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
          label: 'Manage users and databases',
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
          id: 'keydb/how-to/export-import-data',
          label: 'Export and import data',
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
    {
      type: 'doc',
      id: 'keydb/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
  ],
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
          id: 'shared-storage/how-to/access',
          label: 'Use shared storage',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/backup',
          label: 'Backup shared storage',
        },
        {
          type: 'doc',
          id: 'shared-storage/how-to/delete',
          label: 'Delete shared storage service',
        },
      ],
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
        type: 'doc',
        id: 'frameworks/laravel/faq',
        label: 'FAQ',
        customProps: {
          sidebar_is_title: true,
          sidebar_icon: 'chat-bubble-left-right',
        },
      },
    ]
};

function createRuntimeCategory(icon, categoryName, prettyName) {
  return [
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
      id: categoryName + '/overview',
      label: prettyName + ' overview',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: icon,
      },
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
          id: categoryName + '/how-to/env-variables',
          label: 'Manage environment variables',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/customize-runtime',
          label: 'Customize runtime',
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
          id: categoryName + '/how-to/build-pipeline',
          label: 'Configure build & deploy pipeline',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/trigger-pipeline',
          label: 'Trigger build pipeline',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/build-process',
          label: 'Build process',
        },
      ],
    },
    {
      type: 'category',
      label: 'Monitoring & Maintenance',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: categoryName + '/how-to/logs',
          label: 'Setup & access logs',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/scaling',
          label: 'Scale ' + prettyName + ' runtime service',
        },
      ],
    },
    {
      type: 'doc',
      id: categoryName + '/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
  ]
};

function createWebserverCategory(icon, categoryName, prettyName) {
  const includeBuildProcess = categoryName === 'php';
  const includeDiveIn = categoryName === 'nginx';

  return [
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
      id: categoryName + '/overview',
      label: prettyName + ' overview',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: icon,
      },
    },
    ...(includeDiveIn ? [
    {
        type: 'category',
        label: 'Dive-in',
        collapsible: false,
        link: {
          type: 'doc',
          id: categoryName + '/getting-started',
        },
        customProps: {
          sidebar_icon: 'rocket-launch',
        },
        className: 'homepage-sidebar-item',
        items: [
          {
            type: 'doc',
            id: categoryName + '/tutorial/quickstart',
            label: 'Quickstart',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
          {
            type: 'doc',
            id: categoryName + '/tutorial/step-by-step',
            label: 'Step-by-step tutorial',
            customProps: {
              exclude_from_doc_list: false,
            },
          },
        ],
      },
     ]  : []),
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
          id: categoryName + '/how-to/env-variables',
          label: 'Manage environment variables',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/customize-runtime',
          label: 'Customize runtime',
        },
          {
            type: 'doc',
            id: categoryName + '/how-to/customize-web-server',
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
          id: categoryName + '/how-to/build-pipeline',
          label: 'Configure build & deploy pipeline',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/trigger-pipeline',
          label: 'Trigger build pipeline',
        },
        ...(includeBuildProcess ? [
          {
            type: 'doc',
            id: categoryName + '/how-to/build-process',
            label: 'Build process',
          }
        ] : []),
      ],
    },
    {
      type: 'category',
      label: 'Monitoring & Maintenance',
      collapsible: false,
      customProps: {
        sidebar_is_group_headline: true,
      },
      items: [
        {
          type: 'doc',
          id: categoryName + '/how-to/logs',
          label: 'Setup & access logs',
        },
        {
          type: 'doc',
          id: categoryName + '/how-to/scaling',
          label: 'Scale ' + prettyName + ' runtime service',
        },
      ],
    },
    {
      type: 'doc',
      id: categoryName + '/faq',
      label: 'FAQ',
      customProps: {
        sidebar_is_title: true,
        sidebar_icon: 'chat-bubble-left-right',
      },
    },
  ]
};
