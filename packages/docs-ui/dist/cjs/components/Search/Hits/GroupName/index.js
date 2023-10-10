"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHitGroupName = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const SearchHitGroupName = ({ name }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("pb-docs_0.25 flex px-docs_0.5 pt-docs_1", "text-medusa-fg-muted", "text-compact-x-small-plus") }, name));
};
exports.SearchHitGroupName = SearchHitGroupName;
