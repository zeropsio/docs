"use client";
import React from "react";
import clsx from "clsx";
import { Link } from "../../../components";
export const NavbarLink = ({ href, label, className, isActive, }) => {
    return (React.createElement(Link, { href: href, className: clsx(isActive && "!text-medusa-fg-base", !isActive && "!text-medusa-fg-subtle", "text-compact-small-plus inline-block", "hover:!text-medusa-fg-base", className) }, label));
};
