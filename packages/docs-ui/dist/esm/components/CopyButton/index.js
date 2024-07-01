"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Tooltip } from "../../components";
import { useCopy } from "../../hooks";
export const CopyButton = ({ text, buttonClassName = "", tooltipClassName = "", tooltipText = "Copy to Clipboard", children, className, onCopy, handleTouch, }) => {
    const { isCopied, handleCopy } = useCopy(text);
    const [touchCount, setTouchCount] = useState(0);
    return (React.createElement(Tooltip, { text: isCopied ? `Copied!` : tooltipText, tooltipClassName: clsx(tooltipClassName, handleTouch && "!block"), className: className },
        React.createElement("span", { className: clsx("cursor-pointer", buttonClassName), onClick: (e) => {
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
