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
export const InputText = (_a) => {
    var { addGroupStyling = false, className, passedRef } = _a, props = __rest(_a, ["addGroupStyling", "className", "passedRef"]);
    return (React.createElement("input", Object.assign({}, props, { className: clsx("bg-medusa-bg-field shadow-button-secondary dark:shadow-button-secondary-dark", "border-medusa-border-base rounded-docs_sm border border-solid", "px-docs_0.75 py-[9px]", "hover:bg-medusa-bg-field-hover", addGroupStyling && "group-hover:bg-medusa-bg-field-hover", "focus:border-medusa-border-interactive", "active:border-medusa-border-interactive", "disabled:bg-medusa-bg-disabled", "disabled:border-medusa-border-base", "placeholder:text-medusa-fg-muted", "disabled:placeholder:text-medusa-fg-disabled", "text-compact-medium font-base", className), ref: passedRef })));
};
