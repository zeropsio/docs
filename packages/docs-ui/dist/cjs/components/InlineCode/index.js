"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineCode = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const InlineCode = (props) => {
    return (react_1.default.createElement(components_1.CopyButton, { text: props.children, buttonClassName: (0, clsx_1.default)("bg-transparent border-0 p-0 inline text-medusa-fg-subtle group", "font-monospace") },
        react_1.default.createElement("code", Object.assign({}, props, { className: (0, clsx_1.default)("border-medusa-tag-neutral-border border", "text-medusa-tag-neutral-text", "bg-medusa-tag-neutral-bg font-monospace text-code-label rounded-docs_sm py-0 px-[6px]", "group-active:bg-medusa-bg-subtle-pressed group-focus:bg-medusa-bg-subtle-pressed", "group-hover:bg-medusa-tag-neutral-bg-hover", props.className) }))));
};
exports.InlineCode = InlineCode;
