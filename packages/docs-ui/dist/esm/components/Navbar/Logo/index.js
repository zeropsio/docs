"use client";
import React from "react";
import { useColorMode } from "../../../providers";
import Link from "next/link";
import clsx from "clsx";
export const NavbarLogo = ({ light, dark, className, imageClassName, }) => {
    const { colorMode } = useColorMode();
    return (React.createElement(Link, { href: `/`, className: clsx("flex-1", className) },
        React.createElement("img", { src: colorMode === "light" ? light : dark || light, alt: "Medusa Logo", height: 20, width: 20, className: clsx("align-middle", imageClassName) })));
};
