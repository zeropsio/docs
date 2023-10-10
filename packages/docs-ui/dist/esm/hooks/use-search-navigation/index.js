"use client";
import { useCallback, useEffect, useMemo } from "react";
import { useSearch } from "../../providers";
import { findNextSibling, findPrevSibling } from "../../utils";
import { useKeyboardShortcut, } from "../use-keyboard-shortcut";
export const useSearchNavigation = ({ getInputElm, focusInput, handleSubmit, keyboardProps, }) => {
    const shortcutKeys = useMemo(() => ["ArrowUp", "ArrowDown", "Enter"], []);
    const { modalRef, isOpen } = useSearch();
    const handleKeyAction = (e) => {
        var _a, _b, _c;
        if (!isOpen) {
            return;
        }
        e.preventDefault();
        const focusedItem = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(":focus");
        if (!focusedItem) {
            // focus the first data-hit
            const nextItem = (_b = modalRef.current) === null || _b === void 0 ? void 0 : _b.querySelector("[data-hit]");
            nextItem === null || nextItem === void 0 ? void 0 : nextItem.focus();
            return;
        }
        const isHit = focusedItem.hasAttribute("data-hit");
        const isInput = focusedItem.tagName.toLowerCase() === "input";
        if (!isHit && !isInput) {
            // ignore if focused items aren't input/data-hit
            return;
        }
        const lowerPressedKey = e.key.toLowerCase();
        if (lowerPressedKey === "enter") {
            if (isHit) {
                // trigger click event of the focused element
                focusedItem.click();
            }
            else {
                handleSubmit === null || handleSubmit === void 0 ? void 0 : handleSubmit();
            }
            return;
        }
        if (lowerPressedKey === "arrowup") {
            // only hit items has action on arrow up
            if (isHit) {
                // find if there's a data-hit item before this one
                const beforeItem = findPrevSibling(focusedItem, "[data-hit]");
                if (!beforeItem) {
                    // focus the input
                    focusInput();
                }
                else {
                    // focus the previous item
                    beforeItem.focus();
                }
            }
        }
        else if (lowerPressedKey === "arrowdown") {
            // check if item is input or hit
            if (isInput) {
                // go to the first data-hit item
                const nextItem = (_c = modalRef.current) === null || _c === void 0 ? void 0 : _c.querySelector("[data-hit]");
                nextItem === null || nextItem === void 0 ? void 0 : nextItem.focus();
            }
            else {
                // handle go down for hit items
                // find if there's a data-hit item after this one
                const afterItem = findNextSibling(focusedItem, "[data-hit]");
                if (afterItem) {
                    // focus the next item
                    afterItem.focus();
                }
            }
        }
    };
    /** Handles starting to type which focuses the input */
    const handleKeyDown = useCallback((e) => {
        var _a;
        if (!isOpen) {
            return;
        }
        // check if shortcut keys were pressed
        const lowerPressedKey = e.key.toLowerCase();
        const pressedShortcut = [...shortcutKeys, "Escape"].some((s) => s.toLowerCase() === lowerPressedKey);
        if (pressedShortcut) {
            return;
        }
        const focusedItem = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(":focus");
        const inputElm = getInputElm();
        if (inputElm && focusedItem !== inputElm) {
            focusInput();
        }
    }, [
        shortcutKeys,
        isOpen,
        modalRef.current,
        shortcutKeys,
        getInputElm,
        focusInput,
    ]);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);
    useKeyboardShortcut(Object.assign({ metakey: false, shortcutKeys: shortcutKeys, checkEditing: false, isLoading: false, action: handleKeyAction }, keyboardProps));
};
