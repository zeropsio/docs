"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarColorModeToggle = void 0;
const react_1 = __importDefault(require("react"));
const IconButton_1 = require("../IconButton");
const providers_1 = require("../../../providers");
const icons_1 = require("@medusajs/icons");
const NavbarColorModeToggle = ({ buttonProps, }) => {
    const { colorMode, toggleColorMode } = (0, providers_1.useColorMode)();
    return (react_1.default.createElement(IconButton_1.NavbarIconButton, Object.assign({}, buttonProps, { onClick: () => toggleColorMode() }),
        colorMode === "light" && react_1.default.createElement(icons_1.Sun, { className: "text-medusa-fg-muted" }),
        colorMode === "dark" && react_1.default.createElement(icons_1.Moon, { className: "text-medusa-fg-muted" })));
};
exports.NavbarColorModeToggle = NavbarColorModeToggle;
