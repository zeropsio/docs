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
import clsx from "clsx";
import React from "react";
export const SearchSuggestionItem = (_a) => {
    var { children, onClick, className } = _a, rest = __rest(_a, ["children", "onClick", "className"]);
    return (React.createElement("div", Object.assign({ className: clsx("flex items-center", "cursor-pointer rounded-docs_sm p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none last:mb-docs_1", "text-medusa-fg-base text-compact-small", className), onClick: onClick, "data-hit": true }, rest), children));
};
