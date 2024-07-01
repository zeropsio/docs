"use client";
// @refresh reset
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSidebar } from "../../../providers";
import clsx from "clsx";
import Link from "next/link";
import { checkSidebarItemVisibility } from "../../../utils";
import { Loading } from "../../../components";
export const SidebarItem = ({ item, nested = false, expandItems = false, className, currentLevel = 1, }) => {
    const [showLoading, setShowLoading] = useState(false);
    const { isItemActive, setMobileSidebarOpen: setSidebarOpen, disableActiveTransition, noTitleStyling, sidebarRef, } = useSidebar();
    const active = useMemo(() => isItemActive(item, nested), [isItemActive, item, nested]);
    const collapsed = !expandItems && !isItemActive(item, true);
    const ref = useRef(null);
    const itemChildren = useMemo(() => {
        return item.isChildSidebar ? undefined : item.children;
    }, [item]);
    const canHaveTitleStyling = useMemo(() => item.hasTitleStyling ||
        (((itemChildren === null || itemChildren === void 0 ? void 0 : itemChildren.length) || !item.loaded) && !noTitleStyling && !nested), [itemChildren, noTitleStyling, item, nested]);
    const classNames = useMemo(() => clsx("flex items-center justify-between gap-docs_0.5 rounded-docs_sm px-docs_0.5 py-[6px] hover:no-underline", "border", !canHaveTitleStyling && "text-compact-small-plus text-medusa-fg-subtle", canHaveTitleStyling &&
        "text-compact-x-small-plus text-medusa-fg-muted uppercase", item.path !== undefined &&
        active && ["!text-medusa-fg-base bg-medusa-bg-base-pressed"], (item.path === undefined || !active) && "border-transparent", item.path !== undefined && active && " border-medusa-border-base", item.path !== undefined &&
        !active &&
        "hover:bg-medusa-bg-base-hover border-transparent"), [canHaveTitleStyling, active, item.path]);
    /**
     * Tries to place the item in the center of the sidebar
     */
    const newTopCalculator = () => {
        var _a;
        if (!sidebarRef.current || !ref.current) {
            return 0;
        }
        const sidebarBoundingRect = sidebarRef.current.getBoundingClientRect();
        const sidebarHalf = sidebarBoundingRect.height / 2;
        const itemTop = ref.current.offsetTop;
        const itemBottom = itemTop + ((_a = ref.current.children.item(0)) === null || _a === void 0 ? void 0 : _a.clientHeight);
        // try deducting half
        let newTop = itemTop - sidebarHalf;
        let newBottom = newTop + sidebarBoundingRect.height;
        if (newTop <= itemTop && newBottom >= itemBottom) {
            return newTop;
        }
        // try adding half
        newTop = itemTop + sidebarHalf;
        newBottom = newTop + sidebarBoundingRect.height;
        if (newTop <= itemTop && newBottom >= itemBottom) {
            return newTop;
        }
        //return the item's top minus some top margin
        return itemTop - sidebarBoundingRect.top;
    };
    useEffect(() => {
        if (active &&
            ref.current &&
            sidebarRef.current &&
            window.innerWidth >= 1025) {
            if (!disableActiveTransition &&
                !checkSidebarItemVisibility(ref.current.children.item(0) || ref.current, !disableActiveTransition)) {
                ref.current.scrollIntoView({
                    block: "center",
                });
            }
            else if (disableActiveTransition) {
                sidebarRef.current.scrollTo({
                    top: newTopCalculator(),
                });
            }
        }
        if (active) {
            setShowLoading(true);
        }
    }, [active, sidebarRef.current, disableActiveTransition]);
    return (React.createElement("li", { className: clsx(canHaveTitleStyling && !collapsed && "my-docs_1.5", !canHaveTitleStyling &&
            !nested &&
            active &&
            !disableActiveTransition &&
            "mt-docs_1.5", !expandItems &&
            ((canHaveTitleStyling && !collapsed) ||
                (!canHaveTitleStyling && !nested && active)) &&
            "-translate-y-docs_1 transition-transform", className), ref: ref },
        item.path === undefined && (React.createElement("span", { className: classNames },
            React.createElement("span", null, item.title),
            item.additionalElms)),
        item.path !== undefined && (React.createElement(Link, Object.assign({ href: item.isPathHref ? item.path : `#${item.path}`, className: classNames, scroll: true, onClick: () => {
                if (window.innerWidth < 1025) {
                    setSidebarOpen(false);
                }
            }, replace: !item.isPathHref, shallow: !item.isPathHref }, item.linkProps),
            React.createElement("span", null, item.title),
            item.additionalElms)),
        itemChildren && (React.createElement("ul", { className: clsx("ease-ease overflow-hidden", collapsed && "m-0 h-0"), style: {
                paddingLeft: noTitleStyling ? `${currentLevel * 6}px` : 0,
            } },
            showLoading && !item.loaded && (React.createElement(Loading, { count: 3, className: "!mb-0 !px-docs_0.5", barClassName: "h-[20px]" })), itemChildren === null || itemChildren === void 0 ? void 0 :
            itemChildren.map((childItem, index) => (React.createElement(SidebarItem, { item: childItem, key: index, nested: true, currentLevel: currentLevel + 1, expandItems: expandItems })))))));
};
