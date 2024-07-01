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
exports.SidebarItem = void 0;
// @refresh reset
const react_1 = __importStar(require("react"));
const providers_1 = require("../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("../../../utils");
const components_1 = require("../../../components");
const SidebarItem = ({ item, nested = false, expandItems = false, className, currentLevel = 1, }) => {
    const [showLoading, setShowLoading] = (0, react_1.useState)(false);
    const { isItemActive, setMobileSidebarOpen: setSidebarOpen, disableActiveTransition, noTitleStyling, sidebarRef, } = (0, providers_1.useSidebar)();
    const active = (0, react_1.useMemo)(() => isItemActive(item, nested), [isItemActive, item, nested]);
    const collapsed = !expandItems && !isItemActive(item, true);
    const ref = (0, react_1.useRef)(null);
    const itemChildren = (0, react_1.useMemo)(() => {
        return item.isChildSidebar ? undefined : item.children;
    }, [item]);
    const canHaveTitleStyling = (0, react_1.useMemo)(() => item.hasTitleStyling ||
        (((itemChildren === null || itemChildren === void 0 ? void 0 : itemChildren.length) || !item.loaded) && !noTitleStyling && !nested), [itemChildren, noTitleStyling, item, nested]);
    const classNames = (0, react_1.useMemo)(() => (0, clsx_1.default)("flex items-center justify-between gap-docs_0.5 rounded-docs_sm px-docs_0.5 py-[6px] hover:no-underline", "border", !canHaveTitleStyling && "text-compact-small-plus text-medusa-fg-subtle", canHaveTitleStyling &&
        "text-compact-x-small-plus text-medusa-fg-muted uppercase", item.path !== undefined &&
        active && ["!text-medusa-fg-base bg-medusa-bg-base-pressed"], (item.path === undefined || !active) && "border-transparent", item.path !== undefined && active && " border-medusa-border-base", item.path !== undefined &&
        !active &&
        "hover:bg-medusa-bg-base-hover border-transparent"), [canHaveTitleStyling, active, item.path]);
    /**
     * Tries to place the item in the center of the sidebar
     */
    const newTopCalculator = () => {
        var _a;
        if (!sidebarRef.current || !ref.current) {
            return 0;
        }
        const sidebarBoundingRect = sidebarRef.current.getBoundingClientRect();
        const sidebarHalf = sidebarBoundingRect.height / 2;
        const itemTop = ref.current.offsetTop;
        const itemBottom = itemTop + ((_a = ref.current.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientHeight);
        // try deducting half
        let newTop = itemTop - sidebarHalf;
        let newBottom = newTop + sidebarBoundingRect.height;
        if (newTop <= itemTop && newBottom >= itemBottom) {
            return newTop;
        }
        // try adding half
        newTop = itemTop + sidebarHalf;
        newBottom = newTop + sidebarBoundingRect.height;
        if (newTop <= itemTop && newBottom >= itemBottom) {
            return newTop;
        }
        //return the item's top minus some top margin
        return itemTop - sidebarBoundingRect.top;
    };
    (0, react_1.useEffect)(() => {
        if (active &&
            ref.current &&
            sidebarRef.current &&
            window.innerWidth >= 1025) {
            if (!disableActiveTransition &&
                !(0, utils_1.checkSidebarItemVisibility)(ref.current.children.item(0) || ref.current, !disableActiveTransition)) {
                ref.current.scrollIntoView({
                    block: "center",
                });
            }
            else if (disableActiveTransition) {
                sidebarRef.current.scrollTo({
                    top: newTopCalculator(),
                });
            }
        }
        if (active) {
            setShowLoading(true);
        }
    }, [active, sidebarRef.current, disableActiveTransition]);
    return (react_1.default.createElement("li", { className: (0, clsx_1.default)(canHaveTitleStyling && !collapsed && "my-docs_1.5", !canHaveTitleStyling &&
            !nested &&
            active &&
            !disableActiveTransition &&
            "mt-docs_1.5", !expandItems &&
            ((canHaveTitleStyling && !collapsed) ||
                (!canHaveTitleStyling && !nested && active)) &&
            "-translate-y-docs_1 transition-transform", className), ref: ref },
        item.path === undefined && (react_1.default.createElement("span", { className: classNames },
            react_1.default.createElement("span", null, item.title),
            item.additionalElms)),
        item.path !== undefined && (react_1.default.createElement(link_1.default, Object.assign({ href: item.isPathHref ? item.path : `#${item.path}`, className: classNames, scroll: true, onClick: () => {
                if (window.innerWidth < 1025) {
                    setSidebarOpen(false);
                }
            }, replace: !item.isPathHref, shallow: !item.isPathHref }, item.linkProps),
            react_1.default.createElement("span", null, item.title),
            item.additionalElms)),
        itemChildren && (react_1.default.createElement("ul", { className: (0, clsx_1.default)("ease-ease overflow-hidden", collapsed && "m-0 h-0"), style: {
                paddingLeft: noTitleStyling ? `${currentLevel * 6}px` : 0,
            } },
            showLoading && !item.loaded && (react_1.default.createElement(components_1.Loading, { count: 3, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" })), itemChildren === null || itemChildren === void 0 ? void 0 :
            itemChildren.map((childItem, index) => (react_1.default.createElement(exports.SidebarItem, { item: childItem, key: index, nested: true, currentLevel: currentLevel + 1, expandItems: expandItems })))))));
};
exports.SidebarItem = SidebarItem;
