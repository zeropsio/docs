"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinnerLoading = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const SpinnerLoading = ({ iconProps }) => {
    return (react_1.default.createElement("span", { role: "status" },
        react_1.default.createElement(icons_1.Spinner, Object.assign({}, iconProps, { className: (0, clsx_1.default)("animate-spin", iconProps === null || iconProps === void 0 ? void 0 : iconProps.className) }))));
};
exports.SpinnerLoading = SpinnerLoading;
