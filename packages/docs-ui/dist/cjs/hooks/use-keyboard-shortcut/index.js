"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyboardShortcut = void 0;
const react_1 = require("react");
const useKeyboardShortcut = ({ metakey = true, shortcutKeys, action, checkEditing = true, preventDefault = true, isLoading = false, }) => {
    function isEditingContent(event) {
        const element = event.target;
        const tagName = element.tagName;
        return (element.isContentEditable ||
            tagName === "INPUT" ||
            tagName === "SELECT" ||
            tagName === "TEXTAREA");
    }
    const checkKeysPressed = (0, react_1.useCallback)((pressedKey) => {
        const lowerPressedKey = pressedKey.toLowerCase();
        return shortcutKeys.some((value) => lowerPressedKey === value.toLowerCase());
    }, [shortcutKeys]);
    const sidebarShortcut = (0, react_1.useCallback)((e) => {
        // the event is triggered when an input
        // autocompletes, and in that case
        // e.key will be empty
        if (isLoading || !e.key) {
            return;
        }
        if ((!metakey || e.metaKey || e.ctrlKey) &&
            checkKeysPressed(e.key) &&
            (!checkEditing || !isEditingContent(e))) {
            if (preventDefault) {
                e.preventDefault();
            }
            action(e);
        }
    }, [isLoading, metakey, checkKeysPressed, checkEditing, action, preventDefault]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("keydown", sidebarShortcut);
        return () => {
            window.removeEventListener("keydown", sidebarShortcut);
        };
    }, [sidebarShortcut]);
};
exports.useKeyboardShortcut = useKeyboardShortcut;
