"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import clsx from "clsx";
import React, { useCallback, useEffect, useRef } from "react";
import { useModal } from "../../providers";
import { ModalHeader } from "./Header";
import { ModalFooter } from "./Footer";
import { useKeyboardShortcut } from "../../hooks/use-keyboard-shortcut";
export const Modal = (_a) => {
    var { className, title, actions, children, contentClassName, modalContainerClassName, onClose, open = true, footerContent, passedRef } = _a, props = __rest(_a, ["className", "title", "actions", "children", "contentClassName", "modalContainerClassName", "onClose", "open", "footerContent", "passedRef"]);
    const { closeModal } = useModal();
    const ref = useRef(null);
    const setRefs = useCallback((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    useKeyboardShortcut({
        metakey: false,
        checkEditing: false,
        shortcutKeys: ["escape"],
        action: () => {
            var _a;
            if (open) {
                (_a = ref.current) === null || _a === void 0 ? void 0 : _a.close();
            }
        },
    });
    const handleClick = (e) => {
        // close modal when the user clicks outside the content
        if (e.target === ref.current) {
            closeModal();
            onClose === null || onClose === void 0 ? void 0 : onClose(e);
        }
    };
    const handleClose = (e) => {
        onClose === null || onClose === void 0 ? void 0 : onClose(e);
        closeModal();
    };
    useEffect(() => {
        if (open) {
            document.body.setAttribute("data-modal", "opened");
        }
        else {
            document.body.removeAttribute("data-modal");
        }
    }, [open]);
    return (React.createElement("dialog", Object.assign({}, props, { className: clsx("fixed top-0 left-0 flex h-screen w-screen items-center justify-center", "bg-medusa-bg-overlay", "hidden open:flex border-0 p-0", className), onClick: handleClick, ref: setRefs, onClose: handleClose, open: open }),
        React.createElement("div", { className: clsx("bg-medusa-bg-base rounded-docs_sm", "border-medusa-border-base border border-solid", "shadow-modal dark:shadow-modal-dark", "w-[90%] md:h-auto md:w-[75%] lg:w-[560px]", modalContainerClassName) },
            title && React.createElement(ModalHeader, { title: title }),
            React.createElement("div", { className: clsx("overflow-auto py-docs_1.5 px-docs_2", contentClassName) }, children),
            actions && (actions === null || actions === void 0 ? void 0 : actions.length) > 0 && React.createElement(ModalFooter, { actions: actions }),
            footerContent && React.createElement(ModalFooter, null, footerContent))));
};
