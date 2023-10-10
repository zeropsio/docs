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
const react_1 = __importStar(require("react"));
const providers_1 = require("../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const link_1 = __importDefault(require("next/link"));
const utils_1 = require("../../../utils");
const components_1 = require("../../../components");
const SidebarItem = ({ item, nested = false, expandItems = false, className, }) => {
    var _a;
    const [showLoading, setShowLoading] = (0, react_1.useState)(false);
    const { isItemActive, setMobileSidebarOpen: setSidebarOpen } = (0, providers_1.useSidebar)();
    const active = (0, react_1.useMemo)(() => {
        return isItemActive(item, nested);
    }, [isItemActive, item, nested]);
    const collapsed = !expandItems && !isItemActive(item, true);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (active && ref.current && window.innerWidth >= 1025) {
            if (!(0, utils_1.checkSidebarItemVisibility)(ref.current, {
                topMargin: 57,
            })) {
                // scroll to element
                ref.current.scrollIntoView({
                    block: "center",
                });
            }
        }
        if (active) {
            setShowLoading(true);
        }
    }, [active]);
    const classNames = (0, react_1.useMemo)(() => (0, clsx_1.default)("flex items-center justify-between gap-docs_0.5 rounded-docs_sm px-docs_0.5 py-[6px] hover:no-underline", !item.children && "text-compact-small-plus text-medusa-fg-subtle", item.children &&
        "text-compact-x-small-plus text-medusa-fg-muted uppercase", item.path !== undefined &&
        active && ["!text-medusa-fg-base bg-medusa-bg-base-pressed"], item.path !== undefined && active && "border border-medusa-border-base", item.path !== undefined &&
        !active &&
        "hover:bg-medusa-bg-base-hover border-transparent"), [item.children, active, item.path]);
    return (react_1.default.createElement("li", { className: (0, clsx_1.default)(item.children && !collapsed && "my-docs_1.5", !item.children && !nested && active && "mt-docs_1.5", !expandItems &&
            ((item.children && !collapsed) ||
                (!item.children && !nested && active)) &&
            "-translate-y-docs_1 transition-transform", className), ref: ref },
        item.path === undefined && (react_1.default.createElement("span", { className: classNames },
            react_1.default.createElement("span", null, item.title),
            item.additionalElms)),
        item.path !== undefined && (react_1.default.createElement(link_1.default, Object.assign({ href: item.isPathHref ? item.path : `#${item.path}`, className: classNames, scroll: true, onClick: () => {
                if (window.innerWidth < 1025) {
                    setSidebarOpen(false);
                }
            }, replace: true, shallow: true }, item.linkProps),
            react_1.default.createElement("span", null, item.title),
            item.additionalElms)),
        item.children && (react_1.default.createElement("ul", { className: (0, clsx_1.default)("ease-ease overflow-hidden", collapsed && "m-0 h-0") },
            showLoading && !item.loaded && (react_1.default.createElement(components_1.Loading, { count: 3, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" })), (_a = item.children) === null || _a === void 0 ? void 0 :
            _a.map((childItem, index) => (react_1.default.createElement(exports.SidebarItem, { item: childItem, key: index, nested: true })))))));
};
exports.SidebarItem = SidebarItem;
