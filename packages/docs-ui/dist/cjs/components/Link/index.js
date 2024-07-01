"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const clsx_1 = __importDefault(require("clsx"));
const Link = (_a) => {
    var { href, children, className } = _a, rest = __rest(_a, ["href", "children", "className"]);
    if (href === null || href === void 0 ? void 0 : href.replace(/#.*$/, "").endsWith("page.mdx")) {
        href = href.replace("/page.mdx", "");
    }
    return (react_1.default.createElement(link_1.default, Object.assign({ href: href || "" }, rest, { className: (0, clsx_1.default)("text-medusa-fg-interactive hover:text-medusa-fg-interactive-hover", className) }), children));
};
exports.Link = Link;
