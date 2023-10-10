"use client";
import React from "react";
import { SearchModalOpener } from "../../../components";
import { useMobile } from "../../../providers";
export const NavbarSearchModalOpener = ({ isLoading, }) => {
    const { isMobile } = useMobile();
    return React.createElement(SearchModalOpener, { isMobile: isMobile, isLoading: isLoading });
};
