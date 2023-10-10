"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCopy = void 0;
const react_1 = require("react");
const copy_text_to_clipboard_1 = __importDefault(require("copy-text-to-clipboard"));
const useCopy = (text) => {
    const [isCopied, setIsCopied] = (0, react_1.useState)(false);
    const copyTimeout = (0, react_1.useRef)(0);
    const handleCopy = (0, react_1.useCallback)(() => {
        (0, copy_text_to_clipboard_1.default)(text);
        setIsCopied(true);
        copyTimeout.current = window.setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }, [text]);
    (0, react_1.useEffect)(() => () => window.clearTimeout(copyTimeout.current), []);
    return { isCopied, handleCopy };
};
exports.useCopy = useCopy;
