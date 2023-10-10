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
import ReactMarkdown from "react-markdown";
import { CodeMdx, Details, Kbd, Link } from "../../components";
import clsx from "clsx";
export const MarkdownContent = ({ children }) => {
    return (React.createElement(ReactMarkdown, { components: {
            code: CodeMdx,
            pre: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (React.createElement("pre", Object.assign({ className: clsx("p-0 bg-transparent", className) }, props), children));
            },
            kbd: Kbd,
            details: Details,
            a: Link,
            ul: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (React.createElement("ul", Object.assign({}, props, { className: clsx("list-disc px-docs_1 mb-docs_1.5", className) }), children));
            },
            ol: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (React.createElement("ol", Object.assign({}, props, { className: clsx("list-decimal px-docs_1 mb-docs_1.5", className) }), children));
            },
            li: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (React.createElement("li", Object.assign({ className: clsx("text-medusa-fg-subtle", className) }, props),
                    React.createElement("span", null, children)));
            },
            p: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (React.createElement("p", Object.assign({ className: clsx("text-medusa-fg-subtle [&:not(:last-child)]:mb-docs_1.5 last:!mb-0", className) }, props)));
            },
        } }, children));
};
