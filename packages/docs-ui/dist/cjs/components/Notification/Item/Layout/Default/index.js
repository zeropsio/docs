"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationItemLayoutDefault = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const components_1 = require("../../../../../components");
const NotificationItemLayoutDefault = ({ type = "info", title = "", text = "", children, isClosable = true, handleClose, CustomIcon, closeButtonText = "Close", }) => {
    return (react_1.default.createElement("div", { className: "bg-medusa-bg-base w-full h-full shadow-flyout dark:shadow-flyout-dark rounded-docs_DEFAULT" },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_1 p-docs_1") },
            type !== "none" && (react_1.default.createElement("div", { className: (0, clsx_1.default)(type !== "custom" && "w-docs_2 flex justify-center items-center") },
                type === "info" && (react_1.default.createElement(icons_1.InformationCircleSolid, { className: "text-medusa-tag-blue-icon" })),
                type === "error" && (react_1.default.createElement(icons_1.XCircleSolid, { className: "text-medusa-tag-red-icon" })),
                type === "warning" && (react_1.default.createElement(icons_1.ExclamationCircleSolid, { className: "text-medusa-tag-orange-icon" })),
                type === "success" && (react_1.default.createElement(icons_1.CheckCircleSolid, { className: "text-medusa-tag-green-icon" })),
                type === "custom" && CustomIcon)),
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-medium-plus", "text-medusa-fg-base") }, title)),
        (text || children) && (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex pt-0 pr-docs_1 pb-docs_1.5 pl-docs_1 gap-docs_1", "border-0 border-b border-solid border-medusa-border-base") },
            react_1.default.createElement("div", { className: "w-docs_2 flex-none" }),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col", children && "gap-docs_1") },
                text && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medium text-medusa-fg-subtle") }, text)),
                children))),
        isClosable && (react_1.default.createElement("div", { className: (0, clsx_1.default)("p-docs_1 flex justify-end items-center") },
            react_1.default.createElement(components_1.Button, { onClick: handleClose }, closeButtonText)))));
};
exports.NotificationItemLayoutDefault = NotificationItemLayoutDefault;
