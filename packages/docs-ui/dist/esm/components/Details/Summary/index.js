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
import { PlusMini } from "@medusajs/icons";
export const DetailsSummary = (_a) => {
    var { title, subtitle, children, badge, expandable = true, open = false, className, titleClassName, hideExpandableIcon = false, summaryRef } = _a, rest = __rest(_a, ["title", "subtitle", "children", "badge", "expandable", "open", "className", "titleClassName", "hideExpandableIcon", "summaryRef"]);
    return (React.createElement("summary", Object.assign({ className: clsx("py-docs_0.75 flex items-center justify-between", expandable && "cursor-pointer", !expandable &&
            "border-medusa-border-base border-y border-solid border-x-0", (expandable || badge) && "gap-0.5", "no-marker", className), ref: summaryRef }, rest),
        React.createElement("span", { className: "gap-docs_0.25 flex flex-col" },
            React.createElement("span", { className: clsx("text-compact-medium-plus text-medusa-fg-base", titleClassName) }, title || children),
            subtitle && (React.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle mt-0.5" }, subtitle))),
        (badge || expandable) && (React.createElement("span", { className: "flex gap-docs_0.5" },
            badge,
            expandable && !hideExpandableIcon && (React.createElement(PlusMini, { className: clsx("transition-transform", open && "rotate-45") }))))));
};
