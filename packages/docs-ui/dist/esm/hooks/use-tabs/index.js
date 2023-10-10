"use client";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState, } from "react";
export function useTabs({ tabs, group }) {
    const [selectedTab, setSelectedTab] = useState(null);
    const storageKey = useMemo(() => `tab_${group}`, [group]);
    const eventKey = useMemo(() => `tab_${group}_changed`, [group]);
    const scrollPosition = useRef(0);
    const changeSelectedTab = (tab) => {
        scrollPosition.current = window.scrollY;
        setSelectedTab(tab);
        localStorage.setItem(storageKey, tab.value);
        window.dispatchEvent(new CustomEvent(eventKey, {
            detail: {
                storageValue: tab.value,
            },
        }));
    };
    const findTabItem = useCallback((val) => {
        const lowerVal = val.toLowerCase();
        return tabs.find((t) => t.value.toLowerCase() === lowerVal);
    }, [tabs]);
    const handleStorageChange = useCallback((e) => {
        if (e.detail.storageValue !== (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.value)) {
            // check if tab exists
            const tab = findTabItem(e.detail.storageValue);
            if (tab) {
                setSelectedTab(tab);
            }
        }
    }, [selectedTab, findTabItem]);
    useEffect(() => {
        if (!selectedTab) {
            const storedSelectedTabValue = localStorage.getItem(storageKey);
            setSelectedTab(storedSelectedTabValue
                ? findTabItem(storedSelectedTabValue) || tabs[0]
                : tabs[0]);
        }
    }, [selectedTab, storageKey, tabs, findTabItem]);
    useEffect(() => {
        window.addEventListener(eventKey, handleStorageChange);
        return () => {
            window.removeEventListener(eventKey, handleStorageChange);
        };
    }, [handleStorageChange, eventKey]);
    useLayoutEffect(() => {
        if (scrollPosition.current && window.scrollY !== scrollPosition.current) {
            window.scrollTo(0, scrollPosition.current);
        }
    }, [selectedTab]);
    return { selectedTab, changeSelectedTab };
}
