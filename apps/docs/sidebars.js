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
      type: "category",
      label: "Getting started",
      link: {
        type: "doc",
        id: "getting-started/index",
      },
      customProps: {
        sidebar_icon: "rocket-launch",
      },
      className: "homepage-sidebar-item",
      items: [
        {
          type: "doc",
          id: "getting-started/what-is-zerops",
          label: "What is Zerops and how does it compare to other solutions",
          customProps: {
            iconName: "shopping-cart",
            exclude_from_doc_list: false,
          },
        },
        {
          type: "doc",
          id: "getting-started/examples",
          label: "First application in 60 seconds",
          customProps: {
            iconName: "shopping-cart",
            exclude_from_doc_list: false,
          },
        }
      ],
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
      id: "features/index",
      label: "Feater Overview",
      customProps: {
        sidebar_icon: "map",
      },
      className: "homepage-sidebar-item",
    },
    {
      type: "doc",
      id: "features/infrastructure",
      label: "Project infrastructure",
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
  ],
}
