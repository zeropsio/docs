"use client";
import React, { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import { CheckMini, EllipseMiniSolid } from "@medusajs/icons";
export const SelectDropdown = ({ open, setOpen, options, addAll, multiple = false, isAllSelected, isValueSelected, handleSelectAll, handleChange: handleSelectChange, parentRef, className, passedRef, }) => {
    const ref = useRef(null);
    const setRefs = useCallback((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    const handleChange = (clickedValue, wasSelected) => {
        handleSelectChange === null || handleSelectChange === void 0 ? void 0 : handleSelectChange(clickedValue, wasSelected);
        if (!multiple) {
            setOpen(false);
        }
    };
    const handleOutsideClick = useCallback((e) => {
        var _a, _b;
        if (open &&
            !((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) &&
            !((_b = parentRef === null || parentRef === void 0 ? void 0 : parentRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) {
            setOpen(false);
        }
    }, [open, parentRef, setOpen]);
    useEffect(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [handleOutsideClick]);
    const getSelectOption = (option, index) => {
        const isSelected = option.isAllOption
            ? isAllSelected
            : isValueSelected(option.value);
        return (React.createElement("li", { key: index, className: clsx("pr-docs_0.75 relative rounded-docs_sm py-docs_0.5 pl-docs_2.5", "hover:bg-medusa-bg-base-hover", "[&>svg]:left-docs_0.75 cursor-pointer [&>svg]:absolute [&>svg]:top-docs_0.5", !isSelected && "text-compact-small", isSelected && "text-compact-small-plus"), onClick: () => {
                if (option.isAllOption) {
                    handleSelectAll();
                }
                else {
                    handleChange(option.value, isSelected);
                }
            } },
            isSelected && (React.createElement(React.Fragment, null,
                multiple && React.createElement(CheckMini, { className: "text-medusa-fg-base" }),
                !multiple && React.createElement(EllipseMiniSolid, { className: "text-medusa-fg-base" }))),
            option.label));
    };
    return (React.createElement("div", { className: clsx("absolute top-full left-0 w-full", "h-0 translate-y-0 overflow-hidden transition-transform", open && "h-auto translate-y-docs_0.5 !overflow-visible", className), ref: setRefs },
        React.createElement("ul", { className: clsx("p-docs_0.25 mb-0 w-full overflow-auto rounded-docs_DEFAULT", "bg-medusa-bg-base text-medusa-fg-base", "shadow-flyout dark:shadow-flyout-dark list-none") },
            addAll &&
                getSelectOption({
                    value: "all",
                    label: "All Areas",
                    isAllOption: true,
                }, -1),
            options.map(getSelectOption))));
};
