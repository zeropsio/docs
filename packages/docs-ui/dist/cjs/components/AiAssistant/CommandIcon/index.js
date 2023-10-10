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
exports.AiAssistantCommandIcon = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const AiAssistantCommandIcon = (_a) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (react_1.default.createElement("span", Object.assign({ className: (0, clsx_1.default)("bg-button-inverted bg-medusa-button-inverted dark:bg-button-inverted-dark", "rounded-md p-[2px] text-medusa-fg-on-inverted flex", className) }, props),
        react_1.default.createElement(icons_1.SparklesSolid, null)));
};
exports.AiAssistantCommandIcon = AiAssistantCommandIcon;
