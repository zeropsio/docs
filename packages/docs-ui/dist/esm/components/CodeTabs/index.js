"use client";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import { CodeBlock } from "../../components";
import { useTabs, useScrollPositionBlocker } from "../../hooks";
export const CodeTabs = ({ tabs, className, group = "client", }) => {
    const { selectedTab, changeSelectedTab } = useTabs({
        tabs,
        group,
    });
    const tabRefs = useMemo(() => [], []);
    const codeTabSelectorRef = useRef(null);
    const codeTabsWrapperRef = useRef(null);
    const { blockElementScrollPositionUntilNextRender } = useScrollPositionBlocker();
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
        React.createElement("span", { className: clsx("xs:absolute xs:border xs:border-solid xs:border-medusa-code-border xs:bg-medusa-code-bg-base", "xs:transition-all xs:duration-200 xs:ease-ease xs:top-[13px] xs:rounded-full"), ref: codeTabSelectorRef }),
        React.createElement("ul", { className: clsx("bg-medusa-code-bg-header py-docs_0.75 flex !list-none rounded-t-docs_DEFAULT px-docs_1", "border-medusa-code-border border border-b-0", "gap-docs_0.25 mb-0") }, tabs.map((tab, index) => (React.createElement("li", { key: index },
            React.createElement("button", { className: clsx("text-compact-small-plus xs:border-0 py-docs_0.25 px-docs_0.75 relative rounded-full border", (!selectedTab || selectedTab.value !== tab.value) && [
                    "text-medusa-code-text-subtle border-transparent",
                    "hover:bg-medusa-code-bg-base",
                ], (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.value) === tab.value && [
                    "text-medusa-code-text-base bg-medusa-code-bg-base xs:!bg-transparent",
                    "xs:!bg-transparent",
                ]), ref: (tabControl) => tabRefs.push(tabControl), onClick: (e) => {
                    blockElementScrollPositionUntilNextRender(e.target);
                    changeSelectedTab(tab);
                }, "aria-selected": (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.value) === tab.value, role: "tab" }, tab.label))))),
        React.createElement(React.Fragment, null,
            (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.code) && (React.createElement(CodeBlock, Object.assign({}, selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.code, { className: clsx("!mt-0 !rounded-t-none", selectedTab.code.className) }))),
            (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.codeBlock) && React.createElement(React.Fragment, null, selectedTab.codeBlock))));
};
