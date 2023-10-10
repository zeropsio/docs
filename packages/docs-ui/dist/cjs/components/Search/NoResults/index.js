"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchNoResult = void 0;
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const SearchNoResult = () => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex h-full w-full flex-col items-center justify-center gap-docs_1", "text-medusa-fg-muted") },
        react_1.default.createElement(icons_1.ExclamationCircleSolid, null),
        react_1.default.createElement("span", { className: "text-compact-small" }, "No results found. Try changing selected filters.")));
};
exports.SearchNoResult = SearchNoResult;
