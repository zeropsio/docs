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
exports.SearchModalOpener = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const providers_1 = require("../../../providers");
const components_1 = require("../../../components");
const icons_1 = require("@medusajs/icons");
const hooks_1 = require("../../../hooks");
const SearchModalOpener = ({ isLoading = false, isMobile = false, }) => {
    const { setIsOpen } = (0, providers_1.useSearch)();
    const isApple = (0, react_1.useMemo)(() => {
        return typeof navigator !== "undefined"
            ? navigator.userAgent.toLowerCase().indexOf("mac") !== 0
            : true;
    }, []);
    (0, hooks_1.useKeyboardShortcut)({
        shortcutKeys: ["k"],
        action: () => setIsOpen((prev) => !prev),
        isLoading,
    });
    const handleOpen = (e) => {
        if (isLoading) {
            return;
        }
        e.preventDefault();
        if ("blur" in e.target && typeof e.target.blur === "function") {
            e.target.blur();
        }
        setIsOpen(true);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        isMobile && (react_1.default.createElement(components_1.Button, { variant: "clear", onClick: handleOpen },
            react_1.default.createElement(icons_1.MagnifyingGlass, { className: "text-medusa-fg-muted" }))),
        !isMobile && (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative w-min hover:cursor-pointer group"), onClick: handleOpen },
            react_1.default.createElement(icons_1.MagnifyingGlass, { className: (0, clsx_1.default)("absolute left-docs_0.5 top-[5px]", "text-medusa-fg-muted") }),
            react_1.default.createElement(components_1.InputText, { type: "search", className: (0, clsx_1.default)("placeholder:text-compact-small", "!py-[5px] !pl-[36px] !pr-docs_0.5", "cursor-pointer select-none"), placeholder: "Find something", onClick: handleOpen, onFocus: (e) => e.target.blur(), tabIndex: -1, addGroupStyling: true }),
            react_1.default.createElement("span", { className: (0, clsx_1.default)("gap-docs_0.25 flex", "absolute right-docs_0.5 top-[5px]") },
                react_1.default.createElement(components_1.Kbd, null, isApple ? "⌘" : "Ctrl"),
                react_1.default.createElement(components_1.Kbd, null, "K"))))));
};
exports.SearchModalOpener = SearchModalOpener;
