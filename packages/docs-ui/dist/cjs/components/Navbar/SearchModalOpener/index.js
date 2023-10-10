"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarSearchModalOpener = void 0;
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const providers_1 = require("../../../providers");
const NavbarSearchModalOpener = ({ isLoading, }) => {
    const { isMobile } = (0, providers_1.useMobile)();
    return react_1.default.createElement(components_1.SearchModalOpener, { isMobile: isMobile, isLoading: isLoading });
};
exports.NavbarSearchModalOpener = NavbarSearchModalOpener;
