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
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useSelect } from "../../../hooks";
import { SelectDropdown } from "..";
import { Badge } from "../../../index.js";
import { ChevronUpDown, XMarkMini } from "@medusajs/icons";
export const SelectInput = (_a) => {
    var { value, options, setSelected, addSelected, removeSelected, multiple, className, addAll = multiple, handleAddAll, showClearButton = true } = _a, props = __rest(_a, ["value", "options", "setSelected", "addSelected", "removeSelected", "multiple", "className", "addAll", "handleAddAll", "showClearButton"]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const dropdownRef = useRef(null);
    const { isValueSelected, hasSelectedValue, hasSelectedValues, selectedValues, isAllSelected, handleChange, handleSelectAll, } = useSelect({
        value,
        options,
        multiple,
        setSelected,
        removeSelected,
        addSelected,
        handleAddAll,
    });
    return (React.createElement("div", { className: clsx("px-docs_0.75 relative py-[9px]", "border-medusa-border-base rounded-docs_sm border border-solid", "bg-medusa-bg-field shadow-button-neutral dark:shadow-button-neutral-dark", "hover:bg-medusa-bg-field-hover", "active:shadow-active dark:active:shadow-active-dark", "focus:shadow-active dark:focus:shadow-active-dark", "text-medusa-fg-base text-compact-medium", "disabled:bg-medusa-bg-disabled", "disabled:text-medusa-fg-disabled", "flex items-center gap-docs_0.5", !hasSelectedValues && "placeholder:text-medusa-fg-muted", hasSelectedValues && "placeholder:text-medusa-fg-base", className), ref: ref, onClick: (e) => {
            var _a;
            if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                setOpen((prev) => !prev);
            }
        } },
        hasSelectedValues && (React.createElement(Badge, { variant: "neutral", className: clsx("flex", showClearButton && "flex-1") },
            React.createElement("span", { className: clsx("text-compact-medium-plus inline-block", showClearButton && "mr-docs_0.125") }, value.length),
            showClearButton && (React.createElement(XMarkMini, { className: "text-medusa-tag-neutral-icon", onClick: (e) => {
                    e.stopPropagation();
                    setSelected === null || setSelected === void 0 ? void 0 : setSelected([]);
                } })))),
        React.createElement("span", { className: clsx("inline-block flex-1 select-none overflow-ellipsis whitespace-nowrap break-words", hasSelectedValues && "max-w-1/3") }, !multiple && hasSelectedValue && selectedValues.length
            ? selectedValues[0].label
            : props.placeholder),
        React.createElement(ChevronUpDown, { className: "text-medusa-fg-muted" }),
        React.createElement("input", { type: "hidden", name: props.name, value: Array.isArray(value) ? value.join(",") : value }),
        React.createElement(SelectDropdown, { options: options, open: open, setOpen: setOpen, addAll: addAll, multiple: multiple, isAllSelected: isAllSelected, isValueSelected: isValueSelected, handleSelectAll: handleSelectAll, handleChange: handleChange, parentRef: ref, passedRef: dropdownRef })));
};
