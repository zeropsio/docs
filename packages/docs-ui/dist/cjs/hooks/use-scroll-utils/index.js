"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEvent = useEvent;
exports.usePrevious = usePrevious;
exports.ScrollControllerProvider = ScrollControllerProvider;
exports.useScrollController = useScrollController;
exports.useScrollPosition = useScrollPosition;
exports.useScrollPositionBlocker = useScrollPositionBlocker;
/* Copied from Docusaurus to maintain scroll position on re-renders. Useful when content of the page is updated dynamically */
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const react_1 = __importStar(require("react"));
const utils_1 = require("../../utils");
function useEvent(callback) {
    const ref = (0, react_1.useRef)(callback);
    (0, react_1.useLayoutEffect)(() => {
        ref.current = callback;
    }, [callback]);
    // @ts-expect-error: TS is right that this callback may be a supertype of T,
    // but good enough for our use
    return (0, react_1.useCallback)((...args) => ref.current(...args), []);
}
/**
 * Gets `value` from the last render.
 */
function usePrevious(value) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useLayoutEffect)(() => {
        ref.current = value;
    });
    return ref.current;
}
function useScrollControllerContextValue({ scrollableSelector, }) {
    const scrollEventsEnabledRef = (0, react_1.useRef)(true);
    const [scrollableElement, setScrollableElement] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        setScrollableElement(document.querySelector(scrollableSelector) || window);
    }, []);
    const getScrolledTop = () => {
        return scrollableElement ? (0, utils_1.getScrolledTop)(scrollableElement) : 0;
    };
    return (0, react_1.useMemo)(() => ({
        scrollEventsEnabledRef,
        enableScrollEvents: () => {
            scrollEventsEnabledRef.current = true;
        },
        disableScrollEvents: () => {
            scrollEventsEnabledRef.current = false;
        },
        scrollableElement,
        getScrolledTop,
    }), [scrollableElement]);
}
const ScrollMonitorContext = react_1.default.createContext(undefined);
function ScrollControllerProvider({ children, scrollableSelector = "", }) {
    const value = useScrollControllerContextValue({
        scrollableSelector,
    });
    return (react_1.default.createElement(ScrollMonitorContext.Provider, { value: value }, children));
}
/**
 * We need a way to update the scroll position while ignoring scroll events
 * so as not to toggle Navbar/BackToTop visibility.
 *
 * This API permits to temporarily disable/ignore scroll events. Motivated by
 * https://github.com/facebook/docusaurus/pull/5618
 */
function useScrollController() {
    const context = (0, react_1.useContext)(ScrollMonitorContext);
    if (context == null) {
        throw new Error(`useScrollController must be used by elements in ScrollControllerProvider`);
    }
    return context;
}
const getScrollPosition = () => ({
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
});
/**
 * This hook fires an effect when the scroll position changes. The effect will
 * be provided with the before/after scroll positions. Note that the effect may
 * not be always run: if scrolling is disabled through `useScrollController`, it
 * will be a no-op.
 *
 * @see {@link useScrollController}
 */
function useScrollPosition(effect, deps = []) {
    const { scrollEventsEnabledRef } = useScrollController();
    const lastPositionRef = (0, react_1.useRef)(getScrollPosition());
    const dynamicEffect = useEvent(effect);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            if (!scrollEventsEnabledRef.current) {
                return;
            }
            const currentPosition = getScrollPosition();
            dynamicEffect(currentPosition, lastPositionRef.current);
            lastPositionRef.current = currentPosition;
        };
        const opts = {
            passive: true,
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, opts);
        return () => window.removeEventListener("scroll", handleScroll, opts);
    }, [dynamicEffect, scrollEventsEnabledRef, ...deps]);
}
function useScrollPositionSaver() {
    const { scrollableElement } = useScrollController();
    const lastElementRef = (0, react_1.useRef)({
        elem: null,
        top: 0,
    });
    const save = (0, react_1.useCallback)((elem) => {
        lastElementRef.current = {
            elem,
            top: elem.getBoundingClientRect().top,
        };
    }, []);
    const restore = (0, react_1.useCallback)(() => {
        const { current: { elem, top }, } = lastElementRef;
        if (!elem) {
            return { restored: false };
        }
        const newTop = elem.getBoundingClientRect().top;
        const heightDiff = newTop - top;
        if (heightDiff) {
            scrollableElement === null || scrollableElement === void 0 ? void 0 : scrollableElement.scrollBy({ left: 0, top: heightDiff });
        }
        lastElementRef.current = { elem: null, top: 0 };
        return { restored: heightDiff !== 0 };
    }, []);
    return (0, react_1.useMemo)(() => ({ save, restore }), [restore, save]);
}
/**
 * This hook permits to "block" the scroll position of a DOM element.
 * The idea is that we should be able to update DOM content above this element
 * but the screen position of this element should not change.
 *
 * Feature motivated by the Tabs groups: clicking on a tab may affect tabs of
 * the same group upper in the tree, yet to avoid a bad UX, the clicked tab must
 * remain under the user mouse.
 *
 * @see https://github.com/facebook/docusaurus/pull/5618
 */
function useScrollPositionBlocker() {
    const scrollController = useScrollController();
    const scrollPositionSaver = useScrollPositionSaver();
    const nextLayoutEffectCallbackRef = (0, react_1.useRef)(undefined);
    const blockElementScrollPositionUntilNextRender = (0, react_1.useCallback)((el) => {
        scrollPositionSaver.save(el);
        scrollController.disableScrollEvents();
        nextLayoutEffectCallbackRef.current = () => {
            const { restored } = scrollPositionSaver.restore();
            nextLayoutEffectCallbackRef.current = undefined;
            // Restoring the former scroll position will trigger a scroll event. We
            // need to wait for next scroll event to happen before enabling the
            // scrollController events again.
            if (restored) {
                const handleScrollRestoreEvent = () => {
                    scrollController.enableScrollEvents();
                    window.removeEventListener("scroll", handleScrollRestoreEvent);
                };
                window.addEventListener("scroll", handleScrollRestoreEvent);
            }
            else {
                scrollController.enableScrollEvents();
            }
        };
    }, [scrollController, scrollPositionSaver]);
    (0, react_1.useLayoutEffect)(() => {
        // Queuing permits to restore scroll position after all useLayoutEffect
        // have run, and yet preserve the sync nature of the scroll restoration
        // See https://github.com/facebook/docusaurus/issues/8625
        queueMicrotask(() => { var _a; return (_a = nextLayoutEffectCallbackRef.current) === null || _a === void 0 ? void 0 : _a.call(nextLayoutEffectCallbackRef); });
    });
    return {
        blockElementScrollPositionUntilNextRender,
    };
}
