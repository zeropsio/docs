"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Link_1 = require("./Link");
const ColorModeToggle_1 = require("./ColorModeToggle");
const Logo_1 = require("./Logo");
const MobileMenu_1 = require("./MobileMenu");
const Navbar = ({ logo, items, showSearchOpener = true, showColorModeToggle = true, additionalActionsBefore, additionalActionsAfter, mobileMenuButton, isLoading, className, }) => {
    return (react_1.default.createElement("nav", { className: (0, clsx_1.default)("h-navbar w-full justify-between", "bg-docs-bg dark:bg-docs-bg-dark border-medusa-border-base border-b", className) },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("h-navbar max-w-xxl py-docs_0.75 mx-auto flex w-full justify-between px-docs_1 lg:px-docs_3") },
            react_1.default.createElement("div", { className: "hidden w-full items-center gap-docs_0.5 lg:flex lg:w-auto lg:gap-docs_1.5" },
                react_1.default.createElement(Logo_1.NavbarLogo, Object.assign({}, logo)),
                items.map((item, index) => (react_1.default.createElement(Link_1.NavbarLink, Object.assign({ key: index }, item))))),
            react_1.default.createElement("div", { className: "hidden min-w-0 flex-1 items-center justify-end gap-docs_0.5 lg:flex" },
                additionalActionsBefore,
                showColorModeToggle && react_1.default.createElement(ColorModeToggle_1.NavbarColorModeToggle, null),
                additionalActionsAfter),
            react_1.default.createElement(MobileMenu_1.NavbarMobileMenu, { logo: logo, menuButton: Object.assign(Object.assign({}, mobileMenuButton), { isLoading }) }))));
};
exports.Navbar = Navbar;
