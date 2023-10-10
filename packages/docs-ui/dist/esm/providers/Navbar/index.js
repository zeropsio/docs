"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
const NavbarContext = createContext(null);
export const NavbarProvider = ({ children, basePath = "", }) => {
    const [activeItem, setActiveItem] = useState(null);
    const pathname = usePathname();
    const assemblePathName = (path) => `${basePath}/${path.charAt(0) === "/" ? path.substring(1) : path}`;
    useEffect(() => {
        const newPath = assemblePathName(pathname);
        if (activeItem !== newPath) {
            setActiveItem(newPath);
        }
    }, [pathname, activeItem]);
    return (React.createElement(NavbarContext.Provider, { value: {
            activeItem,
            setActiveItem,
        } }, children));
};
export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used inside a NavbarProvider");
    }
    return context;
};
