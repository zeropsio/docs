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
exports.MarkdownContent = void 0;
const react_1 = __importDefault(require("react"));
const react_markdown_1 = __importDefault(require("react-markdown"));
const components_1 = require("../../components");
const clsx_1 = __importDefault(require("clsx"));
const MarkdownContent = ({ children }) => {
    return (react_1.default.createElement(react_markdown_1.default, { components: {
            code: components_1.CodeMdx,
            pre: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (react_1.default.createElement("pre", Object.assign({ className: (0, clsx_1.default)("p-0 bg-transparent", className) }, props), children));
            },
            kbd: components_1.Kbd,
            details: components_1.Details,
            a: components_1.Link,
            ul: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (react_1.default.createElement("ul", Object.assign({}, props, { className: (0, clsx_1.default)("list-disc px-docs_1 mb-docs_1.5", className) }), children));
            },
            ol: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (react_1.default.createElement("ol", Object.assign({}, props, { className: (0, clsx_1.default)("list-decimal px-docs_1 mb-docs_1.5", className) }), children));
            },
            li: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (react_1.default.createElement("li", Object.assign({ className: (0, clsx_1.default)("text-medusa-fg-subtle", className) }, props),
                    react_1.default.createElement("span", null, children)));
            },
            p: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (react_1.default.createElement("p", Object.assign({ className: (0, clsx_1.default)("text-medusa-fg-subtle [&:not(:last-child)]:mb-docs_1.5 last:!mb-0", className) }, props)));
            },
        } }, children));
};
exports.MarkdownContent = MarkdownContent;
