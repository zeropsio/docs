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
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { Highlight, themes } from "prism-react-renderer";
import { CopyButton, Tooltip, LegacyLink } from "../../components";
import { useColorMode } from "../../providers";
import { ExclamationCircle, PlaySolid, SquareTwoStack } from "@medusajs/icons";
import { CodeBlockHeader } from "./Header";
import { CodeBlockLine } from "./Line";
import { CSSTransition } from "react-transition-group";
import { ApiRunner } from "./ApiRunner";
import { GITHUB_ISSUES_PREFIX } from "../..";
export const CodeBlock = (_a) => {
    var { source, lang = "", className, collapsed = false, title = "", highlights = [], apiTesting = false, blockStyle = "loud", noCopy = false, noReport = false, noLineNumbers = false, children } = _a, rest = __rest(_a, ["source", "lang", "className", "collapsed", "title", "highlights", "apiTesting", "blockStyle", "noCopy", "noReport", "noLineNumbers", "children"]);
    if (!source && typeof children === "string") {
        source = children;
    }
    const { colorMode } = useColorMode();
    const [showTesting, setShowTesting] = useState(false);
    const canShowApiTesting = useMemo(() => apiTesting && rest.testApiMethod && rest.testApiUrl, [apiTesting, rest]);
    const bgColor = useMemo(() => clsx(blockStyle === "loud" && [
        colorMode === "light" && "bg-medusa-code-bg-base",
        colorMode === "dark" && "bg-medusa-bg-component",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "bg-medusa-bg-subtle",
        colorMode === "dark" && "bg-medusa-code-bg-base",
    ]), [blockStyle, colorMode]);
    const lineNumbersColor = useMemo(() => clsx(blockStyle === "loud" && [
        colorMode === "light" && "text-medusa-code-text-subtle",
        colorMode === "dark" && "text-medusa-fg-muted",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "text-medusa-fg-muted",
        colorMode === "dark" && "text-medusa-code-text-subtle",
    ]), [blockStyle, colorMode]);
    const borderColor = useMemo(() => clsx(blockStyle === "loud" && [
        colorMode === "light" && "border-medusa-code-border",
        colorMode === "dark" && "border-medusa-border-base",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "border-medusa-border-base",
        colorMode === "dark" && "border-medusa-code-border",
    ]), [blockStyle, colorMode]);
    const iconColor = useMemo(() => clsx(blockStyle === "loud" && [
        colorMode === "light" && "text-medusa-code-icon",
        colorMode === "dark" && "text-medusa-fg-muted",
    ], blockStyle === "subtle" && [
        colorMode === "light" && "text-medusa-fg-muted",
        colorMode === "dark" && "text-medusa-code-icon",
    ]), [blockStyle, colorMode]);
    if (!source.length) {
        return React.createElement(React.Fragment, null);
    }
    const transformedHighlights = highlights
        .filter((highlight) => highlight.length !== 0)
        .map((highlight) => ({
        line: parseInt(highlight[0]),
        text: highlight.length >= 2 ? highlight[1] : undefined,
        tooltipText: highlight.length >= 3 ? highlight[2] : undefined,
    }));
    return (React.createElement(React.Fragment, null,
        title && (React.createElement(CodeBlockHeader, { title: title, blockStyle: blockStyle, badgeLabel: rest.badgeLabel, badgeColor: rest.badgeColor })),
        React.createElement("div", { className: clsx("relative mb-docs_1 rounded-b-docs_DEFAULT", "w-full max-w-full border", bgColor, borderColor, collapsed && "max-h-[400px] overflow-auto", !title && "rounded-t-docs_DEFAULT", (blockStyle === "loud" || colorMode !== "light") &&
                "code-block-highlight-dark", blockStyle === "subtle" &&
                colorMode === "light" &&
                "code-block-highlight-light", className) },
            React.createElement(Highlight, Object.assign({ theme: blockStyle === "loud" || colorMode === "dark"
                    ? Object.assign(Object.assign({}, themes.vsDark), { plain: Object.assign(Object.assign({}, themes.vsDark.plain), { backgroundColor: blockStyle === "loud"
                                ? colorMode === "light"
                                    ? "#111827"
                                    : "#27282D"
                                : "#1B1B1F" }) }) : Object.assign(Object.assign({}, themes.vsLight), { plain: Object.assign(Object.assign({}, themes.vsLight.plain), { backgroundColor: "#F9FAFB" }) }), code: source.trim(), language: lang.toLowerCase() }, rest), (_a) => {
                var { className: preClassName, style, tokens } = _a, rest = __rest(_a, ["className", "style", "tokens"]);
                return (React.createElement(React.Fragment, null,
                    React.createElement("pre", { style: Object.assign(Object.assign({}, style), { fontStretch: "100%" }), className: clsx("relative !my-0 break-words bg-transparent !outline-none", "overflow-auto break-words rounded-docs_DEFAULT p-0 xs:max-w-[83%]", preClassName) },
                        React.createElement("code", { className: clsx("text-code-body font-monospace table min-w-full pb-docs_1.5 print:whitespace-pre-wrap", tokens.length > 1 && "pt-docs_1 pr-docs_1", tokens.length <= 1 && "!py-docs_0.25 px-[6px]") }, tokens.map((line, i) => {
                            const highlightedLines = transformedHighlights.filter((highlight) => highlight.line - 1 === i);
                            return (React.createElement(CodeBlockLine, Object.assign({ line: line, lineNumber: i, highlights: highlightedLines, showLineNumber: !noLineNumbers && tokens.length > 1, key: i, bgColorClassName: bgColor, lineNumberColorClassName: lineNumbersColor }, rest)));
                        }))),
                    React.createElement("div", { className: clsx("absolute hidden md:flex md:justify-end", "xs:rounded xs:absolute xs:right-0 xs:top-0 xs:w-[calc(10%+24px)] xs:h-full xs:bg-transparent", tokens.length === 1 && "md:right-[6px] md:top-0", tokens.length > 1 && "md:right-docs_1 md:top-docs_1") },
                        canShowApiTesting && (React.createElement(Tooltip, { text: "Test API", tooltipClassName: "font-base", className: clsx("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            React.createElement(PlaySolid, { className: clsx("cursor-pointer", iconColor), onClick: () => setShowTesting(true) }))),
                        !noReport && (React.createElement(Tooltip, { text: "Report Issue", tooltipClassName: "font-base", className: clsx("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            React.createElement(LegacyLink, { href: `${GITHUB_ISSUES_PREFIX}&title=${encodeURIComponent(`Docs(Code Issue): `)}`, target: "_blank", className: clsx(blockStyle === "loud" && "hover:bg-medusa-code-bg-base", "bg-transparent border-none cursor-pointer rounded", "[&:not(:first-child)]:ml-docs_0.5", "inline-flex justify-center items-center invisible xs:visible"), rel: "noreferrer" },
                                React.createElement(ExclamationCircle, { className: clsx(iconColor) })))),
                        !noCopy && (React.createElement(CopyButton, { text: source, tooltipClassName: "font-base", className: clsx("h-fit", tokens.length === 1 && "p-[6px]", tokens.length > 1 && "px-[6px] pb-[6px]") },
                            React.createElement(SquareTwoStack, { className: clsx(iconColor) }))))));
            })),
        canShowApiTesting && (React.createElement(CSSTransition, { unmountOnExit: true, in: showTesting, timeout: 150, classNames: {
                enter: "animate-fadeIn animate-fastest",
                exit: "animate-fadeOut animate-fastest",
            } },
            React.createElement(ApiRunner, { apiMethod: rest.testApiMethod, apiUrl: rest.testApiUrl, pathData: rest.testPathParams, bodyData: rest.testBodyParams, queryData: rest.testQueryParams })))));
};
