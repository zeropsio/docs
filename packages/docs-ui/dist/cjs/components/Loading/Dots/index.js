"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DotsLoading = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const DotsLoading = ({ className }) => {
    return (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medium text-medusa-fg-subtle", className) },
        react_1.default.createElement("span", { className: "animate-pulsingDots" }, "."),
        react_1.default.createElement("span", { className: "animate-pulsingDots animation-delay-[500ms]" }, "."),
        react_1.default.createElement("span", { className: "animate-pulsingDots animation-delay-[1000ms]" }, ".")));
};
exports.DotsLoading = DotsLoading;
