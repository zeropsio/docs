"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectDropdown = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const SelectDropdown = ({ open, setOpen, options, addAll, multiple = false, isAllSelected, isValueSelected, handleSelectAll, handleChange: handleSelectChange, parentRef, className, passedRef, }) => {
    const ref = (0, react_1.useRef)(null);
    const setRefs = (0, react_1.useCallback)((node) => {
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
    const handleOutsideClick = (0, react_1.useCallback)((e) => {
        var _a, _b;
        if (open &&
            !((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) &&
            !((_b = parentRef === null || parentRef === void 0 ? void 0 : parentRef.current) === null || _b === void 0 ? void 0 : _b.contains(e.target))) {
            setOpen(false);
        }
    }, [open, parentRef, setOpen]);
    (0, react_1.useEffect)(() => {
        document.body.addEventListener("click", handleOutsideClick);
        return () => {
            document.body.removeEventListener("click", handleOutsideClick);
        };
    }, [handleOutsideClick]);
    const getSelectOption = (option, index) => {
        const isSelected = option.isAllOption
            ? isAllSelected
            : isValueSelected(option.value);
        return (react_1.default.createElement("li", { key: index, className: (0, clsx_1.default)("pr-docs_0.75 relative rounded-docs_sm py-docs_0.5 pl-docs_2.5", "hover:bg-medusa-bg-base-hover", "[&>svg]:left-docs_0.75 cursor-pointer [&>svg]:absolute [&>svg]:top-docs_0.5", !isSelected && "text-compact-small", isSelected && "text-compact-small-plus"), onClick: () => {
                if (option.isAllOption) {
                    handleSelectAll();
                }
                else {
                    handleChange(option.value, isSelected);
                }
            } },
            isSelected && (react_1.default.createElement(react_1.default.Fragment, null,
                multiple && react_1.default.createElement(icons_1.CheckMini, { className: "text-medusa-fg-base" }),
                !multiple && react_1.default.createElement(icons_1.EllipseMiniSolid, { className: "text-medusa-fg-base" }))),
            option.label));
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("absolute top-full left-0 w-full", "h-0 translate-y-0 overflow-hidden transition-transform", open && "h-auto translate-y-docs_0.5 !overflow-visible", className), ref: setRefs },
        react_1.default.createElement("ul", { className: (0, clsx_1.default)("p-docs_0.25 mb-0 w-full overflow-auto rounded-docs_DEFAULT", "bg-medusa-bg-base text-medusa-fg-base", "shadow-flyout dark:shadow-flyout-dark list-none") },
            addAll &&
                getSelectOption({
                    value: "all",
                    label: "All Areas",
                    isAllOption: true,
                }, -1),
            options.map(getSelectOption))));
};
exports.SelectDropdown = SelectDropdown;
