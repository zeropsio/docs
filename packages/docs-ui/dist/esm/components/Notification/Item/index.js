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
import React, { Children } from "react";
import { NotificationItemLayoutDefault } from "./Layout/Default";
export const NotificationItem = (_a) => {
    var { className = "", placement = "bottom", show = true, layout = "default", setShow, onClose, children } = _a, rest = __rest(_a, ["className", "placement", "show", "layout", "setShow", "onClose", "children"]);
    const handleClose = () => {
        setShow === null || setShow === void 0 ? void 0 : setShow(false);
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    return (React.createElement("div", { className: clsx("md:max-w-[320px] md:w-[320px] w-full bg-medusa-bg-base rounded-docs_DEFAULT", "shadow-flyout dark:shadow-flyout-dark max-h-[calc(100vh-90px)]", "fixed md:right-docs_1 left-0 md:m-docs_1", placement === "bottom" && "md:bottom-docs_1 bottom-0", placement === "top" && "md:top-docs_1 top-0", "opacity-100 transition-opacity duration-200 ease-ease", !show && "!opacity-0", className) },
        layout === "default" && (React.createElement(NotificationItemLayoutDefault, Object.assign({}, rest, { handleClose: handleClose }), children)),
        layout === "empty" &&
            Children.map(children, (child) => {
                if (child) {
                    return React.cloneElement(child, {
                        onClose: handleClose,
                    });
                }
            })));
};
