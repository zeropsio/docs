"use client";
import React from "react";
import { useSidebar } from "../../providers";
import clsx from "clsx";
import { Loading } from "../../components";
import { SidebarItem } from "./Item";
export const Sidebar = ({ className = "", expandItems = false, }) => {
    const { items, mobileSidebarOpen, desktopSidebarOpen } = useSidebar();
    return (React.createElement("aside", { className: clsx("clip bg-docs-bg dark:bg-docs-bg-dark w-ref-sidebar block", "border-medusa-border-base border-0 border-r border-solid", "fixed -left-full top-0 h-screen transition-[left] lg:relative lg:left-0 lg:top-auto lg:h-auto", "lg:w-sidebar w-full", mobileSidebarOpen && "!left-0 z-50 top-[57px]", !desktopSidebarOpen && "!absolute !-left-full", className), style: {
            animationFillMode: "forwards",
        } },
        React.createElement("ul", { className: clsx("sticky top-0 h-screen max-h-screen w-full list-none overflow-auto p-0", "px-docs_1.5 pb-[57px] pt-docs_1.5"), id: "sidebar" },
            React.createElement("div", { className: "mb-docs_1.5 lg:hidden" },
                !items.mobile.length && React.createElement(Loading, { className: "px-0" }),
                items.mobile.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))),
            React.createElement("div", { className: "mb-docs_1.5" },
                !items.top.length && React.createElement(Loading, { className: "px-0" }),
                items.top.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))),
            React.createElement("div", { className: "mb-docs_1.5" },
                !items.bottom.length && React.createElement(Loading, { className: "px-0" }),
                items.bottom.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))))));
};
