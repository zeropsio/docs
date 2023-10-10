"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../providers");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const Item_1 = require("./Item");
const Sidebar = ({ className = "", expandItems = false, }) => {
    const { items, mobileSidebarOpen, desktopSidebarOpen } = (0, providers_1.useSidebar)();
    return (react_1.default.createElement("aside", { className: (0, clsx_1.default)("clip bg-docs-bg dark:bg-docs-bg-dark w-ref-sidebar block", "border-medusa-border-base border-0 border-r border-solid", "fixed -left-full top-0 h-screen transition-[left] lg:relative lg:left-0 lg:top-auto lg:h-auto", "lg:w-sidebar w-full", mobileSidebarOpen && "!left-0 z-50 top-[57px]", !desktopSidebarOpen && "!absolute !-left-full", className), style: {
            animationFillMode: "forwards",
        } },
        react_1.default.createElement("ul", { className: (0, clsx_1.default)("sticky top-0 h-screen max-h-screen w-full list-none overflow-auto p-0", "px-docs_1.5 pb-[57px] pt-docs_1.5"), id: "sidebar" },
            react_1.default.createElement("div", { className: "mb-docs_1.5 lg:hidden" },
                !items.mobile.length && react_1.default.createElement(components_1.Loading, { className: "px-0" }),
                items.mobile.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))),
            react_1.default.createElement("div", { className: "mb-docs_1.5" },
                !items.top.length && react_1.default.createElement(components_1.Loading, { className: "px-0" }),
                items.top.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))),
            react_1.default.createElement("div", { className: "mb-docs_1.5" },
                !items.bottom.length && react_1.default.createElement(components_1.Loading, { className: "px-0" }),
                items.bottom.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))))));
};
exports.Sidebar = Sidebar;
