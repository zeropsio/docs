"use strict";
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
exports.InputText = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const InputText = (_a) => {
    var { addGroupStyling = false, className, passedRef } = _a, props = __rest(_a, ["addGroupStyling", "className", "passedRef"]);
    return (react_1.default.createElement("input", Object.assign({}, props, { className: (0, clsx_1.default)("bg-medusa-bg-field shadow-button-secondary dark:shadow-button-secondary-dark", "border-medusa-border-base rounded-docs_sm border border-solid", "px-docs_0.75 py-[9px]", "hover:bg-medusa-bg-field-hover", addGroupStyling && "group-hover:bg-medusa-bg-field-hover", "focus:border-medusa-border-interactive", "active:border-medusa-border-interactive", "disabled:bg-medusa-bg-disabled", "disabled:border-medusa-border-base", "placeholder:text-medusa-fg-muted", "disabled:placeholder:text-medusa-fg-disabled", "text-compact-medium font-base", className), ref: passedRef })));
};
exports.InputText = InputText;
