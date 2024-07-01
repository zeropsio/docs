"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const Item_1 = require("./Item");
const Title_1 = require("./Title");
const Back_1 = require("./Back");
const react_transition_group_1 = require("react-transition-group");
const Sidebar = ({ className = "", expandItems = false, }) => {
    var _a;
    const { items, currentItems, mobileSidebarOpen, desktopSidebarOpen, staticSidebarItems, sidebarRef, } = (0, providers_1.useSidebar)();
    const sidebarItems = (0, react_1.useMemo)(() => currentItems || items, [items, currentItems]);
    return (react_1.default.createElement("aside", { className: (0, clsx_1.default)("clip bg-docs-bg dark:bg-docs-bg-dark block", "border-medusa-border-base border-0 border-r border-solid", "fixed -left-full top-0 h-screen transition-[left] lg:relative lg:left-0 lg:top-auto lg:h-auto", "lg:w-sidebar w-full", mobileSidebarOpen && "!left-0 z-50 top-[57px]", !desktopSidebarOpen && "!absolute !-left-full", className), style: {
            animationFillMode: "forwards",
        } },
        react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
            react_1.default.createElement(react_transition_group_1.CSSTransition, { key: ((_a = sidebarItems.parentItem) === null || _a === void 0 ? void 0 : _a.title) || "home", nodeRef: sidebarRef, classNames: {
                    enter: "animate-fadeInLeft animate-fast",
                    exit: "animate-fadeOutLeft animate-fast",
                }, timeout: 200 },
                react_1.default.createElement("ul", { className: (0, clsx_1.default)("sticky top-0 h-screen max-h-screen w-full list-none overflow-auto p-0", "px-docs_1.5 pb-[57px] pt-docs_1.5"), id: "sidebar", ref: sidebarRef },
                    sidebarItems.parentItem && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(Back_1.SidebarBack, null),
                        react_1.default.createElement(Title_1.SidebarTitle, { item: sidebarItems.parentItem }))),
                    react_1.default.createElement("div", { className: "mb-docs_1.5 lg:hidden" },
                        !sidebarItems.mobile.length && !staticSidebarItems && (react_1.default.createElement(components_1.Loading, { className: "px-0" })),
                        sidebarItems.mobile.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))),
                    react_1.default.createElement("div", { className: "mb-docs_1.5" },
                        !sidebarItems.top.length && !staticSidebarItems && (react_1.default.createElement(components_1.Loading, { className: "px-0" })),
                        sidebarItems.top.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))),
                    react_1.default.createElement("div", { className: "mb-docs_1.5" },
                        !sidebarItems.bottom.length && !staticSidebarItems && (react_1.default.createElement(components_1.Loading, { className: "px-0" })),
                        sidebarItems.bottom.map((item, index) => (react_1.default.createElement(Item_1.SidebarItem, { item: item, key: index, expandItems: expandItems })))))))));
};
exports.Sidebar = Sidebar;
