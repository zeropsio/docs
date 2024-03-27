"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarMobileMenuButton = void 0;
const react_1 = __importDefault(require("react"));
const IconButton_1 = require("../../IconButton");
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const NavbarMobileMenuButton = ({ buttonProps, mobileSidebarOpen, setMobileSidebarOpen, isLoading = false, }) => {
    return (react_1.default.createElement(IconButton_1.NavbarIconButton, Object.assign({}, buttonProps, { className: (0, clsx_1.default)("mr-docs_1 lg:!hidden", buttonProps === null || buttonProps === void 0 ? void 0 : buttonProps.className), onClick: () => {
            if (!isLoading) {
                setMobileSidebarOpen((prevValue) => !prevValue);
            }
        } }),
        !mobileSidebarOpen && react_1.default.createElement(icons_1.SidebarLeft, { className: "text-medusa-fg-muted" }),
        mobileSidebarOpen && react_1.default.createElement(icons_1.XMark, { className: "text-medusa-fg-muted" })));
};
exports.NavbarMobileMenuButton = NavbarMobileMenuButton;
