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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const Header_1 = require("./Header");
const Footer_1 = require("./Footer");
const use_keyboard_shortcut_1 = require("../../hooks/use-keyboard-shortcut");
const Modal = (_a) => {
    var { className, title, actions, children, contentClassName, modalContainerClassName, onClose, open = true, footerContent, passedRef } = _a, props = __rest(_a, ["className", "title", "actions", "children", "contentClassName", "modalContainerClassName", "onClose", "open", "footerContent", "passedRef"]);
    const { closeModal } = (0, providers_1.useModal)();
    const ref = (0, react_1.useRef)(null);
    const setRefs = (0, react_1.useCallback)((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        ref.current = node;
        if (typeof passedRef === "function") {
            passedRef(node);
        }
        else if (passedRef && "current" in passedRef) {
            passedRef.current = node;
        }
    }, [passedRef]);
    (0, use_keyboard_shortcut_1.useKeyboardShortcut)({
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
    (0, react_1.useEffect)(() => {
        if (open) {
            document.body.setAttribute("data-modal", "opened");
        }
        else {
            document.body.removeAttribute("data-modal");
        }
    }, [open]);
    return (react_1.default.createElement("dialog", Object.assign({}, props, { className: (0, clsx_1.default)("fixed top-0 left-0 flex h-screen w-screen items-center justify-center", "bg-medusa-bg-overlay", "hidden open:flex border-0 p-0", className), onClick: handleClick, ref: setRefs, onClose: handleClose, open: open }),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base rounded-docs_sm", "border-medusa-border-base border border-solid", "shadow-modal dark:shadow-modal-dark", "w-[90%] md:h-auto md:w-[75%] lg:w-[560px]", modalContainerClassName) },
            title && react_1.default.createElement(Header_1.ModalHeader, { title: title }),
            react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-auto py-docs_1.5 px-docs_2", contentClassName) }, children),
            actions && (actions === null || actions === void 0 ? void 0 : actions.length) > 0 && react_1.default.createElement(Footer_1.ModalFooter, { actions: actions }),
            footerContent && react_1.default.createElement(Footer_1.ModalFooter, null, footerContent))));
};
exports.Modal = Modal;
