"use client";
import React, { createContext, useContext, useState } from "react";
const PageLoadingContext = createContext(null);
export const PageLoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (React.createElement(PageLoadingContext.Provider, { value: {
            isLoading,
            setIsLoading,
        } }, children));
};
export const usePageLoading = () => {
    const context = useContext(PageLoadingContext);
    if (!context) {
        throw new Error("usePageLoading must be used inside a PageLoadingProvider");
    }
    return context;
};
