"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalFooter = void 0;
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../components");
const ModalFooter = ({ actions, children, className, }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_1.5 pl-0 pr-docs_2", "border-medusa-border-base border-0 border-t border-solid", "flex justify-end gap-docs_0.5", className) }, actions === null || actions === void 0 ? void 0 :
        actions.map((action, index) => (react_1.default.createElement(components_1.Button, Object.assign({}, action, { key: index })))),
        children));
};
exports.ModalFooter = ModalFooter;
