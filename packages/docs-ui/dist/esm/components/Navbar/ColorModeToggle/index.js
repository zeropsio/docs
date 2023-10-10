"use client";
import React from "react";
import { NavbarIconButton } from "../IconButton";
import { useColorMode } from "../../../providers";
import { Moon, Sun } from "@medusajs/icons";
export const NavbarColorModeToggle = ({ buttonProps, }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (React.createElement(NavbarIconButton, Object.assign({}, buttonProps, { onClick: () => toggleColorMode() }),
        colorMode === "light" && React.createElement(Sun, { className: "text-medusa-fg-muted" }),
        colorMode === "dark" && React.createElement(Moon, { className: "text-medusa-fg-muted" })));
};
