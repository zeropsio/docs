"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarLink = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../components");
const NavbarLink = ({ href, label, className, isActive, }) => {
    return (react_1.default.createElement(components_1.Link, { href: href, className: (0, clsx_1.default)(isActive && "!text-medusa-fg-base", !isActive && "!text-medusa-fg-subtle", "text-compact-small-plus inline-block", "hover:!text-medusa-fg-base", className) }, label));
};
exports.NavbarLink = NavbarLink;
