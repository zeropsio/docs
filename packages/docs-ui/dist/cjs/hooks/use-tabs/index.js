"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTabs = useTabs;
const react_1 = require("react");
function useTabs({ tabs, group }) {
    const [selectedTab, setSelectedTab] = (0, react_1.useState)(null);
    const storageKey = (0, react_1.useMemo)(() => `tab_${group}`, [group]);
    const eventKey = (0, react_1.useMemo)(() => `tab_${group}_changed`, [group]);
    const scrollPosition = (0, react_1.useRef)(0);
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
    const findTabItem = (0, react_1.useCallback)((val) => {
        const lowerVal = val.toLowerCase();
        return tabs.find((t) => t.value.toLowerCase() === lowerVal);
    }, [tabs]);
    const handleStorageChange = (0, react_1.useCallback)((e) => {
        if (e.detail.storageValue !== (selectedTab === null || selectedTab === void 0 ? void 0 : selectedTab.value)) {
            // check if tab exists
            const tab = findTabItem(e.detail.storageValue);
            if (tab) {
                setSelectedTab(tab);
            }
        }
    }, [selectedTab, findTabItem]);
    (0, react_1.useEffect)(() => {
        if (!selectedTab) {
            const storedSelectedTabValue = localStorage.getItem(storageKey);
            setSelectedTab(storedSelectedTabValue
                ? findTabItem(storedSelectedTabValue) || tabs[0]
                : tabs[0]);
        }
    }, [selectedTab, storageKey, tabs, findTabItem]);
    (0, react_1.useEffect)(() => {
        window.addEventListener(eventKey, handleStorageChange);
        return () => {
            window.removeEventListener(eventKey, handleStorageChange);
        };
    }, [handleStorageChange, eventKey]);
    (0, react_1.useLayoutEffect)(() => {
        if (scrollPosition.current && window.scrollY !== scrollPosition.current) {
            window.scrollTo(0, scrollPosition.current);
        }
    }, [selectedTab]);
    return { selectedTab, changeSelectedTab };
}
