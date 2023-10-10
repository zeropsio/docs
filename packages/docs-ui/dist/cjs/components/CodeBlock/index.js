"use strict";
"use client";
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
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const prism_react_renderer_1 = require("prism-react-renderer");
const docs_ui_1 = require("../../index.js");
const icons_1 = require("@medusajs/icons");
const CodeBlock = (_a) => {
    var { source, lang = "", className, collapsed = false } = _a, rest = __rest(_a, ["source", "lang", "className", "collapsed"]);
    const { colorMode } = (0, docs_ui_1.useColorMode)();
    if (!source.length) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-code-bg-base relative mb-docs_1 rounded-docs_DEFAULT", "border-medusa-code-border w-full max-w-full border", collapsed && "max-h-[400px] overflow-auto", className) },
        react_1.default.createElement(prism_react_renderer_1.Highlight, Object.assign({ theme: Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsDark), { plain: Object.assign(Object.assign({}, prism_react_renderer_1.themes.vsDark.plain), { backgroundColor: colorMode === "light" ? "#111827" : "#1B1B1F" }) }), code: source.trim(), language: lang }, rest), ({ className: preClassName, style, tokens, getLineProps, getTokenProps, }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("pre", { style: Object.assign(Object.assign({}, style), { fontStretch: "100%" }), className: (0, clsx_1.default)("xs:max-w-[90%] relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words rounded-docs_DEFAULT p-0", preClassName) },
                react_1.default.createElement("code", { className: (0, clsx_1.default)("text-code-body font-monospace table min-w-full pb-docs_1.5 print:whitespace-pre-wrap", tokens.length > 1 && "pt-docs_1 pr-docs_1", tokens.length <= 1 && "!py-docs_0.5 px-docs_1") }, tokens.map((line, i) => {
                    const lineProps = getLineProps({ line });
                    return (react_1.default.createElement("span", Object.assign({ key: i }, lineProps, { className: (0, clsx_1.default)("table-row", lineProps.className) }),
                        tokens.length > 1 && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-code-text-subtle mr-docs_1 table-cell select-none", "bg-medusa-code-bg-base sticky left-0 w-[1%] px-docs_1 text-right") }, i + 1)),
                        react_1.default.createElement("span", null, line.map((token, key) => (react_1.default.createElement("span", Object.assign({ key: key }, getTokenProps({ token }))))))));
                }))),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("absolute hidden gap-docs_1 md:flex", "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(10%+24px)] xs:h-full xs:bg-code-fade") },
                react_1.default.createElement(docs_ui_1.CopyButton, { text: source, tooltipClassName: "font-base", className: (0, clsx_1.default)("absolute", tokens.length === 1 && "right-docs_0.75 top-[10px]", tokens.length > 1 && "right-docs_1 top-docs_1") },
                    react_1.default.createElement(icons_1.SquareTwoStackSolid, { className: "text-medusa-code-icon" }))))))));
};
exports.CodeBlock = CodeBlock;
