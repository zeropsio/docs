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
import { CodeBlock, InlineCode, MermaidDiagram, } from "../../components";
import { Npm2YarnCode } from "../Npm2YarnCode";
// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
export const CodeMdx = (_a) => {
    var { className, children } = _a, rest = __rest(_a, ["className", "children"]);
    if (!children) {
        return React.createElement(React.Fragment, null);
    }
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = Array.isArray(children)
        ? children[0]
        : children;
    if (match) {
        if (rest.npm2yarn) {
            return React.createElement(Npm2YarnCode, Object.assign({ npmCode: codeContent }, rest));
        }
        else if (match[1] === "mermaid") {
            return React.createElement(MermaidDiagram, { diagramContent: codeContent });
        }
        return React.createElement(CodeBlock, Object.assign({ source: codeContent, lang: match[1] }, rest));
    }
    return React.createElement(InlineCode, null, codeContent);
};
