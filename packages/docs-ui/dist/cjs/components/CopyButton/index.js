"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopyButton = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const hooks_1 = require("../../hooks");
const CopyButton = ({ text, buttonClassName = "", tooltipClassName = "", children, className, }) => {
    const { isCopied, handleCopy } = (0, hooks_1.useCopy)(text);
    return (react_1.default.createElement(components_1.Tooltip, { text: isCopied ? `Copied!` : `Copy to Clipboard`, tooltipClassName: tooltipClassName, className: className },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("cursor-pointer", buttonClassName), onClick: handleCopy }, children)));
};
exports.CopyButton = CopyButton;
