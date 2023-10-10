"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";
import { Modal } from "../../components";
const ModalContext = createContext(null);
export const ModalProvider = ({ children }) => {
    const [modalProps, setModalProps] = useState(null);
    const closeModal = () => {
        setModalProps(null);
    };
    return (React.createElement(ModalContext.Provider, { value: {
            modalProps,
            setModalProps,
            closeModal,
        } },
        children,
        modalProps && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "bg-medusa-bg-overlay fixed top-0 left-0 z-[499] h-screen w-screen" }),
            React.createElement(Modal, Object.assign({}, modalProps, { onClose: closeModal }))))));
};
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
