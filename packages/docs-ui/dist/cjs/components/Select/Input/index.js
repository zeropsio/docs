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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectInput = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const hooks_1 = require("../../../hooks");
const __1 = require("..");
const docs_ui_1 = require("../../../index.js");
const icons_1 = require("@medusajs/icons");
const SelectInput = (_a) => {
    var { value, options, setSelected, addSelected, removeSelected, multiple, className, addAll = multiple, handleAddAll, showClearButton = true } = _a, props = __rest(_a, ["value", "options", "setSelected", "addSelected", "removeSelected", "multiple", "className", "addAll", "handleAddAll", "showClearButton"]);
    const [open, setOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const dropdownRef = (0, react_1.useRef)(null);
    const { isValueSelected, hasSelectedValue, hasSelectedValues, selectedValues, isAllSelected, handleChange, handleSelectAll, } = (0, hooks_1.useSelect)({
        value,
        options,
        multiple,
        setSelected,
        removeSelected,
        addSelected,
        handleAddAll,
    });
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("px-docs_0.75 relative py-[9px]", "border-medusa-border-base rounded-docs_sm border border-solid", "bg-medusa-bg-field shadow-button-neutral dark:shadow-button-neutral-dark", "hover:bg-medusa-bg-field-hover", "active:shadow-active dark:active:shadow-active-dark", "focus:shadow-active dark:focus:shadow-active-dark", "text-medusa-fg-base text-compact-medium", "disabled:bg-medusa-bg-disabled", "disabled:text-medusa-fg-disabled", "flex items-center gap-docs_0.5", !hasSelectedValues && "placeholder:text-medusa-fg-muted", hasSelectedValues && "placeholder:text-medusa-fg-base", className), ref: ref, onClick: (e) => {
            var _a;
            if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                setOpen((prev) => !prev);
            }
        } },
        hasSelectedValues && (react_1.default.createElement(docs_ui_1.Badge, { variant: "neutral", className: (0, clsx_1.default)("flex", showClearButton && "flex-1") },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-medium-plus inline-block", showClearButton && "mr-docs_0.125") }, value.length),
            showClearButton && (react_1.default.createElement(icons_1.XMarkMini, { className: "text-medusa-tag-neutral-icon", onClick: (e) => {
                    e.stopPropagation();
                    setSelected === null || setSelected === void 0 ? void 0 : setSelected([]);
                } })))),
        react_1.default.createElement("span", { className: (0, clsx_1.default)("inline-block flex-1 select-none overflow-ellipsis whitespace-nowrap break-words", hasSelectedValues && "max-w-1/3") }, !multiple && hasSelectedValue && selectedValues.length
            ? selectedValues[0].label
            : props.placeholder),
        react_1.default.createElement(icons_1.ChevronUpDown, { className: "text-medusa-fg-muted" }),
        react_1.default.createElement("input", { type: "hidden", name: props.name, value: Array.isArray(value) ? value.join(",") : value }),
        react_1.default.createElement(__1.SelectDropdown, { options: options, open: open, setOpen: setOpen, addAll: addAll, multiple: multiple, isAllSelected: isAllSelected, isValueSelected: isValueSelected, handleSelectAll: handleSelectAll, handleChange: handleChange, parentRef: ref, passedRef: dropdownRef })));
};
exports.SelectInput = SelectInput;
