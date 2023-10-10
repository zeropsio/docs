"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useModal = exports.ModalProvider = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("react");
const components_1 = require("../../components");
const ModalContext = (0, react_2.createContext)(null);
const ModalProvider = ({ children }) => {
    const [modalProps, setModalProps] = (0, react_1.useState)(null);
    const closeModal = () => {
        setModalProps(null);
    };
    return (react_1.default.createElement(ModalContext.Provider, { value: {
            modalProps,
            setModalProps,
            closeModal,
        } },
        children,
        modalProps && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "bg-medusa-bg-overlay fixed top-0 left-0 z-[499] h-screen w-screen" }),
            react_1.default.createElement(components_1.Modal, Object.assign({}, modalProps, { onClose: closeModal }))))));
};
exports.ModalProvider = ModalProvider;
const useModal = () => {
    const context = (0, react_1.useContext)(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
exports.useModal = useModal;
