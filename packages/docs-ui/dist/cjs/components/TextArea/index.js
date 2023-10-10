"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextArea = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const TextArea = (props) => {
    return (react_1.default.createElement("textarea", Object.assign({}, props, { className: (0, clsx_1.default)("bg-medusa-bg-field shadow-button-secondary dark:shadow-button-secondary-dark", "border-medusa-border-base rounded-docs_sm border border-solid", "pt-docs_0.4 px-docs_0.75 text-medium font-base pb-[9px]", "hover:bg-medusa-bg-field-hover", "focus:border-medusa-border-interactive", "active:border-medusa-border-interactive", "disabled:bg-medusa-bg-disabled", "disabled:border-medusa-border-base", "placeholder:text-medusa-fg-muted", "disabled:placeholder:text-medusa-fg-disabled", props.className) })));
};
exports.TextArea = TextArea;
