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
import { MDXComponents, LegacyLink } from "../../components";
import clsx from "clsx";
export const MarkdownContent = (_a) => {
    var { children, components } = _a, props = __rest(_a, ["children", "components"]);
    return (React.createElement(ReactMarkdown, Object.assign({ components: components || Object.assign(Object.assign({}, MDXComponents), { pre: (_a) => {
                var { className, children } = _a, props = __rest(_a, ["className", "children"]);
                return (React.createElement("pre", Object.assign({ className: clsx("p-0 bg-transparent", className) }, props), children));
            }, 
            // TODO replace with Link once we move away from Docusaurus
            a: LegacyLink }) }, props), children));
};
