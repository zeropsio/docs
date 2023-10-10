import React from "react";
import clsx from "clsx";
import { NavbarLink } from "./Link";
import { NavbarColorModeToggle } from "./ColorModeToggle";
import { NavbarLogo } from "./Logo";
import { NavbarMobileMenu } from "./MobileMenu";
import { NavbarSearchModalOpener } from "./SearchModalOpener";
export const Navbar = ({ logo, items, showSearchOpener = true, showColorModeToggle = true, additionalActions, mobileMenuButton, isLoading, className, }) => {
    return (React.createElement("nav", { className: clsx("h-navbar w-full justify-between", "bg-docs-bg dark:bg-docs-bg-dark border-medusa-border-base border-b", className) },
        React.createElement("div", { className: clsx("h-navbar max-w-xxl py-docs_0.75 mx-auto flex w-full justify-between px-docs_1 lg:px-docs_3") },
            React.createElement("div", { className: "hidden w-full items-center gap-docs_0.5 lg:flex lg:w-auto lg:gap-docs_1.5" },
                React.createElement(NavbarLogo, Object.assign({}, logo)),
                items.map((item, index) => (React.createElement(NavbarLink, Object.assign({ key: index }, item))))),
            React.createElement("div", { className: "hidden min-w-0 flex-1 items-center justify-end gap-docs_0.5 lg:flex" },
                showSearchOpener && (React.createElement(NavbarSearchModalOpener, { isLoading: isLoading })),
                showColorModeToggle && React.createElement(NavbarColorModeToggle, null),
                additionalActions),
            React.createElement(NavbarMobileMenu, { logo: logo, menuButton: Object.assign(Object.assign({}, mobileMenuButton), { isLoading }) }))));
};
