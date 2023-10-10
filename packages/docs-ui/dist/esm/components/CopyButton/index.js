"use client";
import React from "react";
import clsx from "clsx";
import { Tooltip } from "../../components";
import { useCopy } from "../../hooks";
export const CopyButton = ({ text, buttonClassName = "", tooltipClassName = "", children, className, }) => {
    const { isCopied, handleCopy } = useCopy(text);
    return (React.createElement(Tooltip, { text: isCopied ? `Copied!` : `Copy to Clipboard`, tooltipClassName: tooltipClassName, className: className },
        React.createElement("span", { className: clsx("cursor-pointer", buttonClassName), onClick: handleCopy }, children)));
};
