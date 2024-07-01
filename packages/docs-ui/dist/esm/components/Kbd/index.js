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
export const Kbd = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (React.createElement("kbd", Object.assign({ className: clsx("rounded-docs_sm border-solid py-0 px-[6px]", "inline-flex items-center justify-center", "border-medusa-tag-neutral-border border", "bg-medusa-tag-neutral-bg", "text-medusa-tag-neutral-text", "text-compact-x-small-plus font-base shadow-none", className) }, props), children));
};
