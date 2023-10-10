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
exports.SelectBadge = void 0;
const react_1 = __importStar(require("react"));
const hooks_1 = require("../../../hooks");
const clsx_1 = __importDefault(require("clsx"));
const __1 = require("..");
const SelectBadge = (_a) => {
    var { value, options, setSelected, addSelected, removeSelected, multiple, className, addAll = multiple, handleAddAll } = _a, props = __rest(_a, ["value", "options", "setSelected", "addSelected", "removeSelected", "multiple", "className", "addAll", "handleAddAll"]);
    const [open, setOpen] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const dropdownRef = (0, react_1.useRef)(null);
    const { isValueSelected, isAllSelected, handleChange, handleSelectAll } = (0, hooks_1.useSelect)({
        value,
        options,
        multiple,
        setSelected,
        removeSelected,
        addSelected,
        handleAddAll,
    });
    const getSelectedText = (0, react_1.useCallback)(() => {
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
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-base", "text-compact-x-small-plus", "inline-block max-w-[60px] overflow-hidden text-ellipsis") }, str),
            !isAllSelected && selectedOptions.length > 1 && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") },
                " ",
                "+ ",
                selectedOptions.length))));
    }, [isAllSelected, options, value]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("relative", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("border-medusa-border-base rounded-docs_sm border border-solid", "hover:bg-medusa-bg-subtle-hover", "py-docs_0.25 h-fit cursor-pointer px-docs_0.5", "flex items-center gap-[6px] whitespace-nowrap", "text-medusa-fg-subtle", !open && "bg-medusa-bg-subtle", open && "bg-medusa-bg-subtle-hover", className), ref: ref, onClick: (e) => {
                var _a;
                if (!((_a = dropdownRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                    setOpen((prev) => !prev);
                }
            } },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") },
                "Show results from:",
                " "),
            getSelectedText()),
        react_1.default.createElement("input", { type: "hidden", name: props.name, value: Array.isArray(value) ? value.join(",") : value }),
        react_1.default.createElement(__1.SelectDropdown, { options: options, open: open, setOpen: setOpen, addAll: addAll, multiple: multiple, isAllSelected: isAllSelected, isValueSelected: isValueSelected, handleSelectAll: handleSelectAll, handleChange: handleChange, parentRef: ref, passedRef: dropdownRef, className: (0, clsx_1.default)("!top-[unset] !bottom-full", open && "!-translate-y-docs_0.5") })));
};
exports.SelectBadge = SelectBadge;
exports.default = exports.SelectBadge;
