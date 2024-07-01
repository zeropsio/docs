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
import React, { useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import clsx from "clsx";
import "react-tooltip/dist/react-tooltip.css";
export const Tooltip = (_a) => {
    var { text = "", tooltipClassName = "", children, html = "", tooltipChildren, className } = _a, tooltipProps = __rest(_a, ["text", "tooltipClassName", "children", "html", "tooltipChildren", "className"]);
    const elementId = useId();
    return (React.createElement(React.Fragment, null,
        React.createElement("span", { id: elementId, "data-tooltip-content": text, "data-tooltip-html": html, "data-tooltip-id": elementId, className: className }, children),
        React.createElement(ReactTooltip, Object.assign({ anchorId: elementId, 
            // anchorSelect={elementId ? `#${elementId}` : undefined}
            className: clsx("!border-medusa-border-base !border !border-solid", "!text-compact-x-small-plus !shadow-tooltip dark:!shadow-tooltip-dark !rounded-docs_DEFAULT", "!py-docs_0.4 !z-[399] hidden !px-docs_1 lg:block", "!bg-medusa-bg-base", "!text-medusa-fg-subtle", tooltipClassName), wrapper: "span", noArrow: true, positionStrategy: "fixed" }, tooltipProps), tooltipChildren)));
};
