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
exports.SearchSuggestionItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const SearchSuggestionItem = (_a) => {
    var { children, onClick, className } = _a, rest = __rest(_a, ["children", "onClick", "className"]);
    return (react_1.default.createElement("div", Object.assign({ className: (0, clsx_1.default)("flex items-center", "cursor-pointer rounded-docs_sm p-docs_0.5", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "focus:outline-none last:mb-docs_1", "text-medusa-fg-base text-compact-small", className), onClick: onClick, "data-hit": true }, rest), children));
};
exports.SearchSuggestionItem = SearchSuggestionItem;
