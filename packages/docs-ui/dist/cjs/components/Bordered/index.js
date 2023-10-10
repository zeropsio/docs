"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bordered = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Bordered = ({ wrapperClassName, children }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("border-medusa-border-strong bg-docs-bg", "dark:bg-docs-bg-dark mr-docs_1 inline-flex w-fit items-center justify-center rounded-docs_DEFAULT border border-solid p-[3px]", "no-zoom-img", wrapperClassName) }, children));
};
exports.Bordered = Bordered;
