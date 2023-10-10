"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalHeader = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const providers_1 = require("../../../providers");
const components_1 = require("../../../components");
const icons_1 = require("@medusajs/icons");
const ModalHeader = ({ title }) => {
    const { closeModal } = (0, providers_1.useModal)();
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("border-medusa-border-base border-0 border-b border-solid py-docs_1.5 px-docs_2", "flex items-center justify-between") },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-base text-h2") }, title),
        react_1.default.createElement(components_1.Button, { variant: "clear", className: "cursor-pointer", onClick: () => closeModal() },
            react_1.default.createElement(icons_1.XMark, null))));
};
exports.ModalHeader = ModalHeader;
