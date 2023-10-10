"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarLogo = void 0;
const react_1 = __importDefault(require("react"));
const providers_1 = require("../../../providers");
const link_1 = __importDefault(require("next/link"));
const clsx_1 = __importDefault(require("clsx"));
const NavbarLogo = ({ light, dark, className, imageClassName, }) => {
    const { colorMode } = (0, providers_1.useColorMode)();
    return (react_1.default.createElement(link_1.default, { href: `/`, className: (0, clsx_1.default)("flex-1", className) },
        react_1.default.createElement("img", { src: colorMode === "light" ? light : dark || light, alt: "Medusa Logo", height: 20, width: 20, className: (0, clsx_1.default)("align-middle", imageClassName) })));
};
exports.NavbarLogo = NavbarLogo;
