import React from "react";
import clsx from "clsx";
import { CheckCircleSolid, ExclamationCircleSolid, InformationCircleSolid, XCircleSolid, } from "@medusajs/icons";
import { Button } from "../../../../../components";
export const NotificationItemLayoutDefault = ({ type = "info", title = "", text = "", children, isClosable = true, handleClose, CustomIcon, closeButtonText = "Close", }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: clsx("flex gap-docs_1 p-docs_1") },
            type !== "none" && (React.createElement("div", { className: clsx(type !== "custom" && "w-docs_2 flex justify-center items-center") },
                type === "info" && (React.createElement(InformationCircleSolid, { className: "text-medusa-tag-blue-icon" })),
                type === "error" && (React.createElement(XCircleSolid, { className: "text-medusa-tag-red-icon" })),
                type === "warning" && (React.createElement(ExclamationCircleSolid, { className: "text-medusa-tag-orange-icon" })),
                type === "success" && (React.createElement(CheckCircleSolid, { className: "text-medusa-tag-green-icon" })),
                type === "custom" && CustomIcon)),
            React.createElement("span", { className: clsx("text-compact-medium-plus", "text-medusa-fg-base") }, title)),
        (text || children) && (React.createElement("div", { className: clsx("flex pt-0 pr-docs_1 pb-docs_1.5 pl-docs_1 gap-docs_1", "border-0 border-b border-solid border-medusa-border-base") },
            React.createElement("div", { className: "w-docs_2 flex-none" }),
            React.createElement("div", { className: clsx("flex flex-col", children && "gap-docs_1") },
                text && (React.createElement("span", { className: clsx("text-medium text-medusa-fg-subtle") }, text)),
                children))),
        isClosable && (React.createElement("div", { className: clsx("p-docs_1 flex justify-end items-center") },
            React.createElement(Button, { onClick: handleClose }, closeButtonText)))));
};
