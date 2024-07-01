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
exports.DetailsSummary = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const DetailsSummary = (_a) => {
    var { title, subtitle, children, badge, expandable = true, open = false, className, titleClassName, hideExpandableIcon = false, summaryRef } = _a, rest = __rest(_a, ["title", "subtitle", "children", "badge", "expandable", "open", "className", "titleClassName", "hideExpandableIcon", "summaryRef"]);
    return (react_1.default.createElement("summary", Object.assign({ className: (0, clsx_1.default)("py-docs_0.75 flex items-center justify-between", expandable && "cursor-pointer", !expandable &&
            "border-medusa-border-base border-y border-solid border-x-0", (expandable || badge) && "gap-0.5", "no-marker", className), ref: summaryRef }, rest),
        react_1.default.createElement("span", { className: "gap-docs_0.25 flex flex-col" },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-medium-plus text-medusa-fg-base", titleClassName) }, title || children),
            subtitle && (react_1.default.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle mt-0.5" }, subtitle))),
        (badge || expandable) && (react_1.default.createElement("span", { className: "flex gap-docs_0.5" },
            badge,
            expandable && !hideExpandableIcon && (react_1.default.createElement(icons_1.PlusMini, { className: (0, clsx_1.default)("transition-transform", open && "rotate-45") }))))));
};
exports.DetailsSummary = DetailsSummary;
