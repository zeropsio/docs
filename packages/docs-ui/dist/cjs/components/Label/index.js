"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const Label = ({ children, className }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-base text-compact-medium-plus", className) }, children));
};
exports.Label = Label;
