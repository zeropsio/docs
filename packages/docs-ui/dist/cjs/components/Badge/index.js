"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Badge = ({ className, variant, children }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-x-small-plus px-docs_0.25 py-0 rounded-docs_sm border border-solid text-center", variant === "purple" &&
            "bg-medusa-tag-purple-bg text-medusa-tag-purple-text border-medusa-tag-purple-border", variant === "orange" &&
            "bg-medusa-tag-orange-bg text-medusa-tag-orange-text border-medusa-tag-orange-border", variant === "green" &&
            "bg-medusa-tag-green-bg text-medusa-tag-green-text border-medusa-tag-green-border", variant === "blue" &&
            "bg-medusa-tag-blue-bg text-medusa-tag-blue-text border-medusa-tag-blue-border", variant === "red" &&
            "bg-medusa-tag-red-bg text-medusa-tag-red-text border-medusa-tag-red-border", variant === "neutral" &&
            "bg-medusa-tag-neutral-bg text-medusa-tag-neutral-text border-medusa-tag-neutral-border", "badge", className) }, children));
};
exports.Badge = Badge;
