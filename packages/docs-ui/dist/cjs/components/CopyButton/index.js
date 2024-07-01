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
exports.CopyButton = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const hooks_1 = require("../../hooks");
const CopyButton = ({ text, buttonClassName = "", tooltipClassName = "", tooltipText = "Copy to Clipboard", children, className, onCopy, handleTouch, }) => {
    const { isCopied, handleCopy } = (0, hooks_1.useCopy)(text);
    const [touchCount, setTouchCount] = (0, react_1.useState)(0);
    return (react_1.default.createElement(components_1.Tooltip, { text: isCopied ? `Copied!` : tooltipText, tooltipClassName: (0, clsx_1.default)(tooltipClassName, handleTouch && "!block"), className: className },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("cursor-pointer", buttonClassName), onClick: (e) => {
                if (touchCount > 0) {
                    // prevent the on-click event from triggering if a touch event occurred.
                    return;
                }
                onCopy === null || onCopy === void 0 ? void 0 : onCopy(e);
                handleCopy();
            }, onTouchEnd: (e) => {
                if (!handleTouch) {
                    return;
                }
                if (touchCount === 0) {
                    setTouchCount(touchCount + 1);
                }
                else {
                    onCopy === null || onCopy === void 0 ? void 0 : onCopy(e);
                    handleCopy();
                    setTouchCount(0);
                }
            } }, children)));
};
exports.CopyButton = CopyButton;
