"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeMdx = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../components");
// due to how mdx handles code blocks
// it is required that a code block specify a language
// to be considered a block. Otherwise, it will be
// considered as inline code
const CodeMdx = ({ className, children }) => {
    if (!children) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const match = /language-(\w+)/.exec(className || "");
    if (match) {
        return (react_1.default.createElement(components_1.CodeBlock, { source: Array.isArray(children)
                ? children[0]
                : children, lang: match[1] }));
    }
    return react_1.default.createElement(components_1.InlineCode, null, children);
};
exports.CodeMdx = CodeMdx;
