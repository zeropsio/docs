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
import React from "react";
import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";
import { CopyButton, useColorMode } from "../../index.js";
import { SquareTwoStackSolid } from "@medusajs/icons";
export const CodeBlock = (_a) => {
    var { source, lang = "", className, collapsed = false } = _a, rest = __rest(_a, ["source", "lang", "className", "collapsed"]);
    const { colorMode } = useColorMode();
    if (!source.length) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement("div", { className: clsx("bg-medusa-code-bg-base relative mb-docs_1 rounded-docs_DEFAULT", "border-medusa-code-border w-full max-w-full border", collapsed && "max-h-[400px] overflow-auto", className) },
        React.createElement(Highlight, Object.assign({ theme: Object.assign(Object.assign({}, themes.vsDark), { plain: Object.assign(Object.assign({}, themes.vsDark.plain), { backgroundColor: colorMode === "light" ? "#111827" : "#1B1B1F" }) }), code: source.trim(), language: lang }, rest), ({ className: preClassName, style, tokens, getLineProps, getTokenProps, }) => (React.createElement(React.Fragment, null,
            React.createElement("pre", { style: Object.assign(Object.assign({}, style), { fontStretch: "100%" }), className: clsx("xs:max-w-[90%] relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words rounded-docs_DEFAULT p-0", preClassName) },
                React.createElement("code", { className: clsx("text-code-body font-monospace table min-w-full pb-docs_1.5 print:whitespace-pre-wrap", tokens.length > 1 && "pt-docs_1 pr-docs_1", tokens.length <= 1 && "!py-docs_0.5 px-docs_1") }, tokens.map((line, i) => {
                    const lineProps = getLineProps({ line });
                    return (React.createElement("span", Object.assign({ key: i }, lineProps, { className: clsx("table-row", lineProps.className) }),
                        tokens.length > 1 && (React.createElement("span", { className: clsx("text-medusa-code-text-subtle mr-docs_1 table-cell select-none", "bg-medusa-code-bg-base sticky left-0 w-[1%] px-docs_1 text-right") }, i + 1)),
                        React.createElement("span", null, line.map((token, key) => (React.createElement("span", Object.assign({ key: key }, getTokenProps({ token }))))))));
                }))),
            React.createElement("div", { className: clsx("absolute hidden gap-docs_1 md:flex", "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(10%+24px)] xs:h-full xs:bg-code-fade") },
                React.createElement(CopyButton, { text: source, tooltipClassName: "font-base", className: clsx("absolute", tokens.length === 1 && "right-docs_0.75 top-[10px]", tokens.length > 1 && "right-docs_1 top-docs_1") },
                    React.createElement(SquareTwoStackSolid, { className: "text-medusa-code-icon" }))))))));
};
