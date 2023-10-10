"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderedIcon = void 0;
const react_1 = __importDefault(require("react"));
const Bordered_1 = require("../../components/Bordered");
const clsx_1 = __importDefault(require("clsx"));
const BorderedIcon = ({ icon = "", IconComponent = null, wrapperClassName, iconWrapperClassName, iconClassName, iconColorClassName = "", }) => {
    return (react_1.default.createElement(Bordered_1.Bordered, { wrapperClassName: wrapperClassName },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("rounded-docs_xs p-docs_0.125 bg-medusa-bg-component inline-flex items-center justify-center", iconWrapperClassName) },
            !IconComponent && (react_1.default.createElement("img", { src: icon || "", className: (0, clsx_1.default)(iconClassName, "bordered-icon"), alt: "" })),
            IconComponent && (react_1.default.createElement(IconComponent, { className: (0, clsx_1.default)("text-medusa-fg-subtle", iconClassName, "bordered-icon", iconColorClassName) })))));
};
exports.BorderedIcon = BorderedIcon;
