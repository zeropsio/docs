"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../components");
const Card = ({ icon, title, text, href, className }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-subtle w-full rounded", "shadow-card-rest dark:shadow-card-rest-dark py-docs_0.75 relative px-docs_1", "flex items-center gap-docs_1 transition-shadow", href && "hover:shadow-card-hover dark:hover:shadow-card-hover-dark", className) },
        icon,
        react_1.default.createElement("div", { className: "flex items-center gap-docs_1 justify-between flex-1" },
            react_1.default.createElement("div", { className: "flex flex-col" },
                react_1.default.createElement("span", { className: "text-compact-medium-plus text-medusa-fg-base" }, title),
                text && (react_1.default.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle" }, text))),
            href && (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(icons_1.ArrowUpRightOnBox, { className: "text-medusa-fg-subtle" }),
                react_1.default.createElement(components_1.Link, { href: href, className: "absolute left-0 top-0 h-full w-full rounded" }))))));
};
exports.Card = Card;
