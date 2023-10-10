"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarLink = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const providers_1 = require("../../../providers");
const components_1 = require("../../../components");
const NavbarLink = ({ href, label, className, activeValuePattern, }) => {
    const { activeItem } = (0, providers_1.useNavbar)();
    const isActive = (0, react_1.useMemo)(() => {
        return activeItem
            ? activeValuePattern
                ? activeValuePattern.test(activeItem)
                : href === activeItem
            : false;
    }, [activeItem, href, activeValuePattern]);
    return (react_1.default.createElement(components_1.NextLink, { href: href, className: (0, clsx_1.default)(isActive && "!text-medusa-fg-base", !isActive && "!text-medusa-fg-subtle", "text-compact-small-plus inline-block", "hover:!text-medusa-fg-base", className) }, label));
};
exports.NavbarLink = NavbarLink;
