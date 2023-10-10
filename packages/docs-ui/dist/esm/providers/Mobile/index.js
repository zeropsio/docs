"use client";
import React, { createContext, useCallback, useContext, useEffect, useState, } from "react";
const MobileContext = createContext(null);
export const MobileProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = useCallback(() => {
        if (window.innerWidth < 1025 && !isMobile) {
            setIsMobile(true);
        }
        else if (window.innerWidth >= 1025 && isMobile) {
            setIsMobile(false);
        }
    }, [isMobile]);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);
    useEffect(() => {
        handleResize();
    }, []);
    return (React.createElement(MobileContext.Provider, { value: {
            isMobile,
        } }, children));
};
export const useMobile = () => {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
};
