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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const prism_react_renderer_1 = require("prism-react-renderer");
const components_1 = require("../../components");
const providers_1 = require("../../providers");
const icons_1 = require("@medusajs/icons");
const Header_1 = require("./Header");
const Line_1 = require("./Line");
const react_transition_group_1 = require("react-transition-group");
const ApiRunner_1 = require("./ApiRunner");
const __1 = require("../..");
const CodeBlock = (_a) => {
    var { source, lang = "", className, collapsed = false, title = "", highlights = [], apiTesting = false, blockStyle = "loud", noCopy = false, noReport = false, noLineNumbers = false, children } = _a, rest = __rest(_a, ["source", "lang", "className", "collapsed", "title", "highlights", "apiTesting", "blockStyle", "noCopy", "noReport", "noLineNumbers", "children"]);
    if (!source && typeof children === "string") {
        source = children;
    }
    const { colorMode } = (0, providers_1.useColorMode)();
    const [showTesting, setShowTesting] = (0, react_1.useState)(false);
    const canShowApiTesting = (0, react_1.useMemo)(() => apiTesting && rest.testApiMethod && rest.testApiUrl, [apiTesting, rest]);
    const bgColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && [
        colorMode === "light" && "bg-medusa-code-bg-base",
        colorMode === "dark" && "bg-medusa-bg-component",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "bg-medusa-bg-subtle",
        colorMode === "dark" && "bg-medusa-code-bg-base",
    ]), [blockStyle, colorMode]);
    const lineNumbersColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && [
        colorMode === "light" && "text-medusa-code-text-subtle",
        colorMode === "dark" && "text-medusa-fg-muted",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "text-medusa-fg-muted",
        colorMode === "dark" && "text-medusa-code-text-subtle",
    ]), [blockStyle, colorMode]);
    const borderColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && [
        colorMode === "light" && "border-medusa-code-border",
        colorMode === "dark" && "border-medusa-border-base",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "border-medusa-border-base",
        colorMode === "dark" && "border-medusa-code-border",
    ]), [blockStyle, colorMode]);
    const iconColor = (0, react_1.useMemo)(() => (0, clsx_1.default)(blockStyle === "loud" && [
        colorMode === "light" && "text-medusa-code-icon",
        colorMode === "dark" && "text-medusa-fg-muted",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "text-medusa-fg-muted",
        colorMode === "dark" && "text-medusa-code-icon",
    ]), [blockStyle, colorMode]);
    if (!source.length) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const transformedHighlights = highlights
        .filter((highlight) => highlight.length !== 0)
        .map((highlight) => ({
        line: parseInt(highlight[0]),
        text: highlight.length >= 2 ? highlight[1] : undefined,
        tooltipText: highlight.length >= 3 ? highlight[2] : undefined,
    }));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        title && (react_1.default.createElement(Header_1.CodeBlockHeader, { title: title, blockStyle: blockStyle, badgeLabel: rest.badgeLabel, badgeColor: rest.badgeColor })),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("relative mb-docs_1 rounded-b-docs_DEFAULT", "w-full max-w-full border", bgColor, borderColor, collapsed && "max-h-[400px] overflow-auto", !title && "rounded-t-docs_DEFAULT", (blockStyle === "loud" || colorMode !== "light") &&
                "code-block-highlight-dark", blockStyle === "subtle" &&
                colorMode === "light" &&
                "code-block-highlight-light", className) },
            react_1.default.createElement(prism_react_renderer_1.Highlight, Object.assign({ theme: blockStyle === "loud" || colorMode === "dark"
                    ? Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsDark), { plain: Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsDark.plain), { backgroundColor: blockStyle === "loud"
                                ? colorMode === "light"
                                    ? "#111827"
                                    : "#27282D"
                                : "#1B1B1F" }) }) : Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsLight), { plain: Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsLight.plain), { backgroundColor: "#F9FAFB" }) }), code: source.trim(), language: lang.toLowerCase() }, rest), (_a) => {
                var { className: preClassName, style, tokens } = _a, rest = __rest(_a, ["className", "style", "tokens"]);
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("pre", { style: Object.assign(Object.assign({}, style), { fontStretch: "100%" }), className: (0, clsx_1.default)("relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words rounded-docs_DEFAULT p-0 xs:max-w-[83%]", preClassName) },
                        react_1.default.createElement("code", { className: (0, clsx_1.default)("text-code-body font-monospace table min-w-full pb-docs_1.5 print:whitespace-pre-wrap", tokens.length > 1 && "pt-docs_1 pr-docs_1", tokens.length <= 1 && "!py-docs_0.25 px-[6px]") }, tokens.map((line, i) => {
                            const highlightedLines = transformedHighlights.filter((highlight) => highlight.line - 1 === i);
                            return (react_1.default.createElement(Line_1.CodeBlockLine, Object.assign({ line: line, lineNumber: i, highlights: highlightedLines, showLineNumber: !noLineNumbers && tokens.length > 1, key: i, bgColorClassName: bgColor, lineNumberColorClassName: lineNumbersColor }, rest)));
                        }))),
                    react_1.default.createElement("div", { className: (0, clsx_1.default)("absolute hidden md:flex md:justify-end", "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(10%+24px)] xs:h-full xs:bg-transparent", tokens.length === 1 && "md:right-[6px] md:top-0", tokens.length > 1 && "md:right-docs_1 md:top-docs_1") },
                        canShowApiTesting && (react_1.default.createElement(components_1.Tooltip, { text: "Test API", tooltipClassName: "font-base", className: (0, clsx_1.default)("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            react_1.default.createElement(icons_1.PlaySolid, { className: (0, clsx_1.default)("cursor-pointer", iconColor), onClick: () => setShowTesting(true) }))),
                        !noReport && (react_1.default.createElement(components_1.Tooltip, { text: "Report Issue", tooltipClassName: "font-base", className: (0, clsx_1.default)("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            react_1.default.createElement(components_1.LegacyLink, { href: `${__1.GITHUB_ISSUES_PREFIX}&title=${encodeURIComponent(`Docs(Code Issue): `)}`, target: "_blank", className: (0, clsx_1.default)(blockStyle === "loud" && "hover:bg-medusa-code-bg-base", "bg-transparent border-none cursor-pointer rounded", "[&:not(:first-child)]:ml-docs_0.5", "inline-flex justify-center items-center invisible xs:visible"), rel: "noreferrer" },
                                react_1.default.createElement(icons_1.ExclamationCircle, { className: (0, clsx_1.default)(iconColor) })))),
                        !noCopy && (react_1.default.createElement(components_1.CopyButton, { text: source, tooltipClassName: "font-base", className: (0, clsx_1.default)("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            react_1.default.createElement(icons_1.SquareTwoStack, { className: (0, clsx_1.default)(iconColor) }))))));
            })),
        canShowApiTesting && (react_1.default.createElement(react_transition_group_1.CSSTransition, { unmountOnExit: true, in: showTesting, timeout: 150, classNames: {
                enter: "animate-fadeIn animate-fastest",
                exit: "animate-fadeOut animate-fastest",
            } },
            react_1.default.createElement(ApiRunner_1.ApiRunner, { apiMethod: rest.testApiMethod, apiUrl: rest.testApiUrl, pathData: rest.testPathParams, bodyData: rest.testBodyParams, queryData: rest.testQueryParams })))));
};
exports.CodeBlock = CodeBlock;
