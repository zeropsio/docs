const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'docs.zerops.io',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/zeropsio',
    editLinks: false,
    docsDir: 'documentation',
    editLinkText: '',
    discord: 'c58kMZaEuS',
    lastUpdated: false,
    logo: '/logo.png',
    nav: [
      {
        text: 'Documentation',
        link: '/documentation/',
      },
      {
        text: 'Knowledge base',
        link: '/knowledge-base/',
      }
    ],
    sidebar: {
      '/documentation/': [
        {
          title: 'Zerops Overview',
          collapsable: false,
          children: [
            '',
            'overview/projects-and-services-structure',
            'overview/users',
            'overview/pricing',
            'overview/made-for-developers',
            'overview/roadmap',
            'overview/release-log',
            {
              "type": "group",
              "title": "How Zerops works inside",
              "collapsable": false,
              "children": [
                'overview/how-zerops-works-inside/typical-schemas-of-zerops-projects',
                'overview/how-zerops-works-inside/mariadb-galera-cluster-internally'
              ]
            }
          ]
        },
        {
          title: 'Building apps on Zerops',
          collapsable: false,
          children: [
            'build/how-zerops-build-works',
            'build/build-config',
          ]
        },
        {
          title: 'Deploying code to Zerops',
          collapsable: false,
          children: [
            'deploy/how-deploy-works',
            'deploy/use-in-github-actions',
            'deploy/use-in-gitlab-ci'
          ]
        },
        {
          title: 'GitHub and Zerops',
          collapsable: false,
          children: [
            'github/login-with-github',
            'github/github-integration',
          ]
        },
        {
          title: 'GitLab and Zerops',
          collapsable: false,
          children: [
            'gitlab/login-with-gitlab',
            'gitlab/gitlab-integration',
          ]
        },
        {
          title: 'High availability & Reliability',
          collapsable: false,
          children: [
            'ha/why-should-i-want-high-availability',
            'ha/how-to-make-my-code-ha-enabled',
            'ha/zerops-enterprise-grade-reliability',
          ]
        },
        {
          title: 'Automatic Scaling',
          collapsable: false,
          children: [
            'automatic-scaling/how-automatic-scaling-works',
          ]
        },
        {
          title: 'Backup and restore',
          collapsable: false,
          children: [
            'backup-restore/snapshot-backup',
            'backup-restore/backup-restore-databases',
            'backup-restore/deploy-versioning',
          ]
        },
        {
          title: 'Public & private routing',
          collapsable: false,
          children: [
            'routing/routing-between-project-services',
            'routing/using-your-domain',
            'routing/access-through-ip-and-firewall',
            'routing/change-synchronization',
            'routing/zerops-subdomain',
            'routing/unique-ipv4-ipv6-addresses',
          ]
        },
        {
          title: 'Logs',
          collapsable: false,
          children: [
            'zerops-logs/build-logs',
            'zerops-logs/runtime-logs',
          ]
        },
        {
          title: 'Environment variables',
          collapsable: false,
          children: [
            'environment-variables/how-to-access',
            'environment-variables/helper-variables',
            'environment-variables/commit-changes',
          ]
        },
        {
          title: 'CLI',
          collapsable: false,
          children: [
            'cli/installation',
            'cli/authorization',
            'cli/available-commands',
            'cli/vpn',
          ]
        },
        {
          title: 'Services in Zerops',
          collapsable: false,
          initialOpenGroupIndex: 1,
          children: [
            {
              "type": "group",
              "title": "Runtime environments",
              "collapsable": false,
              "children": [
                'services/runtimes/nodejs',
                'services/runtimes/golang',
                'services/runtimes/php'
              ]
            },
            'services/static-servers',
            {
              "type": "group",
              "title": "Databases",
              "collapsable": false,
              "children": [
                'services/databases/mariadb',
                'services/databases/mongodb',
                'services/databases/redis'
              ]
            },
            'services/search-engines',
            'services/message-brokers',
            'services/storage'
          ]
        }
      ],
      '/knowledge-base/': [
        {
          title: 'Best practices',
          collapsable: false,
          children: [
            'best-practices/how-to-use-environment-variables-efficiently'
          ]
        },
        {
          title: 'How to do',
          collapsable: false,
          children: [
            'how-to-do/build-and-deploy-and-run-nestjs-angular-app',
            'how-to-do/how-to-customize-phpmyadmin-kit-in-windows'
          ]
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    'vuepress-plugin-element-tabs',
    [
      'vuepress-plugin-zooming',
      {
        delay: 1000,
        options: {
          bgColor: 'black',
          zIndex: 10000,
        },
      },
    ],
    [
      'md-enhance',
      {
        presentation: {
          revealConfig: {
            margin: 0,
            controlsLayout: 'edges',
            slideNumber: false
          },
          plugins: [
            'highlight',
            'math',
            'search',
            'notes',
            'zoom'
          ]
        },
        align: true,
        sub: true,
        sup: true,
        footnote: true,
        mark: true,
        demo: true
      }
    ]
  ]
}
