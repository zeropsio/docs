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
import React from "react";
import clsx from "clsx";
import { Button } from "../../../components";
export const NavbarIconButton = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (React.createElement(Button, Object.assign({ className: clsx("[&>svg]:h-[22px] [&>svg]:w-[22px] btn-secondary-icon", className), variant: "secondary" }, props), children));
};
