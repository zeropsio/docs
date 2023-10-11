"use client";
import React from "react";
import { NavbarMobileMenuButton } from "./Button";
import { NavbarColorModeToggle } from "../ColorModeToggle";
import { useMobile } from "../../../providers";
import clsx from "clsx";
import { NavbarLogo } from "../Logo";
export const NavbarMobileMenu = ({ menuButton, logo, }) => {
    var _a;
    const { isMobile } = useMobile();
    return (React.createElement("div", { className: "flex w-full items-center justify-between lg:hidden" }, isMobile && (React.createElement(React.Fragment, null,
        React.createElement(NavbarMobileMenuButton, Object.assign({}, menuButton, { buttonProps: Object.assign(Object.assign({}, (menuButton.buttonProps || {})), { className: clsx((_a = menuButton.buttonProps) === null || _a === void 0 ? void 0 : _a.className, "!border-none !bg-transparent !bg-no-image !shadow-none") }) })),
        React.createElement(NavbarLogo, Object.assign({}, logo, { className: "lg:hidden", imageClassName: "mx-auto" })),
        React.createElement("div", { className: "flex" },
            React.createElement(NavbarColorModeToggle, { buttonProps: {
                    className: "!border-none !bg-transparent !bg-no-image !shadow-none ml-docs_1",
                } }))))));
};
