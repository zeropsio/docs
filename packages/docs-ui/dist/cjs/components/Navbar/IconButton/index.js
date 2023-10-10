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
exports.NavbarIconButton = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../components");
const NavbarIconButton = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react_1.default.createElement(components_1.Button, Object.assign({ className: (0, clsx_1.default)("[&>svg]:h-[22px] [&>svg]:w-[22px] btn-secondary-icon", className), variant: "secondary" }, props), children));
};
exports.NavbarIconButton = NavbarIconButton;
