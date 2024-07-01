"use strict";
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
exports.CodeMdx = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../components");
const Npm2YarnCode_1 = require("../Npm2YarnCode");
// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
const CodeMdx = (_a) => {
    var { className, children } = _a, rest = __rest(_a, ["className", "children"]);
    if (!children) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = Array.isArray(children)
        ? children[0]
        : children;
    if (match) {
        if (rest.npm2yarn) {
            return react_1.default.createElement(Npm2YarnCode_1.Npm2YarnCode, Object.assign({ npmCode: codeContent }, rest));
        }
        else if (match[1] === "mermaid") {
            return react_1.default.createElement(components_1.MermaidDiagram, { diagramContent: codeContent });
        }
        return react_1.default.createElement(components_1.CodeBlock, Object.assign({ source: codeContent, lang: match[1] }, rest));
    }
    return react_1.default.createElement(components_1.InlineCode, null, codeContent);
};
exports.CodeMdx = CodeMdx;
