"use client";
import React, { useMemo } from "react";
import { useSidebar } from "../../providers";
import clsx from "clsx";
import { Loading } from "../../components";
import { SidebarItem } from "./Item";
import { SidebarTitle } from "./Title";
import { SidebarBack } from "./Back";
import { CSSTransition, SwitchTransition } from "react-transition-group";
export const Sidebar = ({ className = "", expandItems = false, }) => {
    var _a;
    const { items, currentItems, mobileSidebarOpen, desktopSidebarOpen, staticSidebarItems, sidebarRef, } = useSidebar();
    const sidebarItems = useMemo(() => currentItems || items, [items, currentItems]);
    return (React.createElement("aside", { className: clsx("clip bg-docs-bg dark:bg-docs-bg-dark block", "border-medusa-border-base border-0 border-r border-solid", "fixed -left-full top-0 h-screen transition-[left] lg:relative lg:left-0 lg:top-auto lg:h-auto", "lg:w-sidebar w-full", mobileSidebarOpen && "!left-0 z-50 top-[57px]", !desktopSidebarOpen && "!absolute !-left-full", className), style: {
            animationFillMode: "forwards",
        } },
        React.createElement(SwitchTransition, null,
            React.createElement(CSSTransition, { key: ((_a = sidebarItems.parentItem) === null || _a === void 0 ? void 0 : _a.title) || "home", nodeRef: sidebarRef, classNames: {
                    enter: "animate-fadeInLeft animate-fast",
                    exit: "animate-fadeOutLeft animate-fast",
                }, timeout: 200 },
                React.createElement("ul", { className: clsx("sticky top-0 h-screen max-h-screen w-full list-none overflow-auto p-0", "px-docs_1.5 pb-[57px] pt-docs_1.5"), id: "sidebar", ref: sidebarRef },
                    sidebarItems.parentItem && (React.createElement(React.Fragment, null,
                        React.createElement(SidebarBack, null),
                        React.createElement(SidebarTitle, { item: sidebarItems.parentItem }))),
                    React.createElement("div", { className: "mb-docs_1.5 lg:hidden" },
                        !sidebarItems.mobile.length && !staticSidebarItems && (React.createElement(Loading, { className: "px-0" })),
                        sidebarItems.mobile.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))),
                    React.createElement("div", { className: "mb-docs_1.5" },
                        !sidebarItems.top.length && !staticSidebarItems && (React.createElement(Loading, { className: "px-0" })),
                        sidebarItems.top.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))),
                    React.createElement("div", { className: "mb-docs_1.5" },
                        !sidebarItems.bottom.length && !staticSidebarItems && (React.createElement(Loading, { className: "px-0" })),
                        sidebarItems.bottom.map((item, index) => (React.createElement(SidebarItem, { item: item, key: index, expandItems: expandItems })))))))));
};
