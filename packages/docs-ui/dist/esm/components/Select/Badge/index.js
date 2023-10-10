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
import React, { useCallback, useRef, useState } from "react";
import { useSelect } from "../../../hooks";
import clsx from "clsx";
import { SelectDropdown } from "..";
export const SelectBadge = (_a) => {
    var { value, options, setSelected, addSelected, removeSelected, multiple, className, addAll = multiple, handleAddAll } = _a, props = __rest(_a, ["value", "options", "setSelected", "addSelected", "removeSelected", "multiple", "className", "addAll", "handleAddAll"]);
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const dropdownRef = useRef(null);
    const { isValueSelected, isAllSelected, handleChange, handleSelectAll } = useSelect({
        value,
        options,
        multiple,
        setSelected,
        removeSelected,
        addSelected,
        handleAddAll,
    });
    const getSelectedText = useCallback(() => {
        let str = "";
        const selectedOptions = options.filter((option) => value.includes(option.value));
        if (isAllSelected) {
            str = "All Areas";
        }
        else {
            if ((!Array.isArray(value) && !value) ||
                (Array.isArray(value) && !value.length)) {
                str = "None selected";
            }
            else {
                str = selectedOptions[0].label;
            }
        }
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: clsx("text-medusa-fg-base", "text-compact-x-small-plus", "inline-block max-w-[60px] overflow-hidden text-ellipsis") }, str),
            !isAllSelected && selectedOptions.length > 1 && (React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") },
                " ",
                "+ ",
                selectedOptions.length))));
    }, [isAllSelected, options, value]);
    return (React.createElement("div", { className: clsx("relative", className) },
        React.createElement("div", { className: clsx("border-medusa-border-base rounded-docs_sm border border-solid", "hover:bg-medusa-bg-subtle-hover", "py-docs_0.25 h-fit cursor-pointer px-docs_0.5", "flex items-center gap-[6px] whitespace-nowrap", "text-medusa-fg-subtle", !open && "bg-medusa-bg-subtle", open && "bg-medusa-bg-subtle-hover", className), ref: ref, onClick: (e) => {
                var _a;
                if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                    setOpen((prev) => !prev);
                }
            } },
            React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") },
                "Show results from:",
                " "),
            getSelectedText()),
        React.createElement("input", { type: "hidden", name: props.name, value: Array.isArray(value) ? value.join(",") : value }),
        React.createElement(SelectDropdown, { options: options, open: open, setOpen: setOpen, addAll: addAll, multiple: multiple, isAllSelected: isAllSelected, isValueSelected: isValueSelected, handleSelectAll: handleSelectAll, handleChange: handleChange, parentRef: ref, passedRef: dropdownRef, className: clsx("!top-[unset] !bottom-full", open && "!-translate-y-docs_0.5") })));
};
export default SelectBadge;
