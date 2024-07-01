"use client";
import React, { Children, useCallback, useEffect, useMemo, useRef } from "react";
import { useColorMode, useTabs, } from "../..";
import clsx from "clsx";
import { CodeBlockHeader } from "../CodeBlock/Header";
export const CodeTabs = ({ children, className, group = "client", title, blockStyle = "loud", }) => {
    var _a;
    const { colorMode } = useColorMode();
    const tabs = useMemo(() => {
        const tempTabs = [];
        Children.forEach(children, (child) => {
            if (!React.isValidElement(child) ||
                !child.props.label ||
                !child.props.value ||
                !React.isValidElement(child.props.children)) {
                return;
            }
            // extract child code block
            const codeBlock = child.props.children.type === "pre" &&
                React.isValidElement(child.props.children.props.children)
                ? child.props.children.props.children
                : child.props.children;
            tempTabs.push({
                label: child.props.label,
                value: child.props.value,
                codeProps: codeBlock.props,
                codeBlock: Object.assign(Object.assign({}, codeBlock), { props: Object.assign(Object.assign({}, codeBlock.props), { title: undefined, className: clsx("!mt-0 !rounded-t-none", codeBlock.props.className) }) }),
            });
        });
        return tempTabs;
    }, [children]);
    const { selectedTab, changeSelectedTab } = useTabs({
        tabs,
        group,
    });
    const tabRefs = useMemo(() => [], []);
    const codeTabSelectorRef = useRef(null);
    const codeTabsWrapperRef = useRef(null);
    const changeTabSelectorCoordinates = useCallback((selectedTabElm) => {
        if (!(codeTabSelectorRef === null || codeTabSelectorRef === void 0 ? void 0 : codeTabSelectorRef.current) || !(codeTabsWrapperRef === null || codeTabsWrapperRef === void 0 ? void 0 : codeTabsWrapperRef.current)) {
            return;
        }
        const selectedTabsCoordinates = selectedTabElm.getBoundingClientRect();
        const tabsWrapperCoordinates = codeTabsWrapperRef.current.getBoundingClientRect();
        codeTabSelectorRef.current.style.left = `${selectedTabsCoordinates.left - tabsWrapperCoordinates.left}px`;
        codeTabSelectorRef.current.style.width = `${selectedTabsCoordinates.width}px`;
        codeTabSelectorRef.current.style.height = `${selectedTabsCoordinates.height}px`;
    }, []);
    useEffect(() => {
        if ((codeTabSelectorRef === null || codeTabSelectorRef === void 0 ? void 0 : codeTabSelectorRef.current) && tabRefs.length) {
            const selectedTabElm = tabRefs.find((tab) => (tab === null || tab === void 0 ? void 0 : tab.getAttribute("aria-selected")) === "true");
            if (selectedTabElm) {
                changeTabSelectorCoordinates(selectedTabElm.parentElement || selectedTabElm);
            }
        }
    }, [codeTabSelectorRef, tabRefs, changeTabSelectorCoordinates, selectedTab]);
    return (React.createElement("div", { className: clsx("relative my-docs_1 w-full max-w-full overflow-auto", className), ref: codeTabsWrapperRef },
        React.createElement("span", { className: clsx("xs:absolute xs:border xs:border-solid", "xs:transition-all xs:duration-200 xs:ease-ease xs:top-[13px] xs:rounded-full", blockStyle === "loud" && [
                colorMode === "light" &&
                    "xs:border-medusa-code-border xs:bg-medusa-code-bg-base",
                colorMode === "dark" &&
                    "xs:border-medusa-border-base xs:bg-medusa-bg-component",
            ], blockStyle === "subtle" && [
                colorMode === "light" &&
                    "xs:border-medusa-border-base xs:bg-medusa-bg-base",
                colorMode === "dark" &&
                    "xs:border-medusa-code-border xs:bg-medusa-code-bg-base",
            ]), ref: codeTabSelectorRef }),
        React.createElement(CodeBlockHeader, { title: ((_a = selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.codeProps) === null || _a === void 0 ? void 0 : _a.title) || title },
            React.createElement("ul", { className: clsx("!list-none flex gap-docs_0.25 items-center", "p-0 mb-0") }, Children.map(children, (child, index) => {
                if (!React.isValidElement(child)) {
                    return React.createElement(React.Fragment, null);
                }
                return (React.createElement(child.type, Object.assign({}, child.props, { changeSelectedTab: changeSelectedTab, pushRef: (tabButton) => tabRefs.push(tabButton), blockStyle: blockStyle, isSelected: !selectedTab
                        ? index === 0
                        : selectedTab.value === child.props.value })));
            }))), selectedTab === null || selectedTab === void 0 ? void 0 :
        selectedTab.codeBlock));
};
