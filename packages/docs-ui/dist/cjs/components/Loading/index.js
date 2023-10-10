"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Loading = ({ className, count = 6, barClassName, }) => {
    const getLoadingBars = () => {
        const bars = [];
        for (let i = 0; i < count; i++) {
            bars.push(react_1.default.createElement("span", { className: (0, clsx_1.default)("bg-medusa-bg-subtle-pressed h-docs_1 w-full rounded-full", barClassName), key: i }));
        }
        return bars;
    };
    return (react_1.default.createElement("span", { role: "status", className: (0, clsx_1.default)("my-docs_1 flex w-full animate-pulse flex-col gap-docs_1", className) },
        getLoadingBars(),
        react_1.default.createElement("span", { className: "sr-only" }, "Loading...")));
};
exports.Loading = Loading;
