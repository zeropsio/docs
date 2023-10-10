"use strict";
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
exports.NotificationItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const Default_1 = require("./Layout/Default");
const NotificationItem = (_a) => {
    var { className = "", placement = "bottom", show = true, layout = "default", setShow, onClose, children } = _a, rest = __rest(_a, ["className", "placement", "show", "layout", "setShow", "onClose", "children"]);
    const handleClose = () => {
        setShow === null || setShow === void 0 ? void 0 : setShow(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("md:max-w-[320px] md:w-[320px] w-full bg-medusa-bg-base rounded-docs_DEFAULT", "shadow-flyout dark:shadow-flyout-dark max-h-[calc(100vh-90px)]", "fixed md:right-docs_1 left-0 md:m-docs_1", placement === "bottom" && "md:bottom-docs_1 bottom-0", placement === "top" && "md:top-docs_1 top-0", "opacity-100 transition-opacity duration-200 ease-ease", !show && "!opacity-0", className) },
        layout === "default" && (react_1.default.createElement(Default_1.NotificationItemLayoutDefault, Object.assign({}, rest, { handleClose: handleClose }), children)),
        layout === "empty" &&
            react_1.Children.map(children, (child) => {
                if (child) {
                    return react_1.default.cloneElement(child, {
                        onClose: handleClose,
                    });
                }
            })));
};
exports.NotificationItem = NotificationItem;
