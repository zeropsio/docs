/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { type ReactNode } from "react";
type EventFunc = (...args: never[]) => unknown;
export declare function useEvent<T extends EventFunc>(callback: T): T;
/**
 * Gets `value` from the last render.
 */
export declare function usePrevious<T>(value: T): T | undefined;
type ScrollController = {
    /** A boolean ref tracking whether scroll events are enabled. */
    scrollEventsEnabledRef: React.MutableRefObject<boolean>;
    /** Enable scroll events in `useScrollPosition`. */
    enableScrollEvents: () => void;
    /** Disable scroll events in `useScrollPosition`. */
    disableScrollEvents: () => void;
    /** Retrieves the scrollable element. By default, it's window. */
    scrollableElement: Element | Window | undefined;
    /** Retrieves the scroll top if the scrollable element */
    getScrolledTop: () => number;
};
export declare function ScrollControllerProvider({ children, scrollableSelector, }: {
    children: ReactNode;
    scrollableSelector?: string;
    restoreScrollOnReload?: boolean;
}): JSX.Element;
/**
 * We need a way to update the scroll position while ignoring scroll events
 * so as not to toggle Navbar/BackToTop visibility.
 *
 * This API permits to temporarily disable/ignore scroll events. Motivated by
 * https://github.com/facebook/docusaurus/pull/5618
 */
export declare function useScrollController(): ScrollController;
type ScrollPosition = {
    scrollX: number;
    scrollY: number;
};
/**
 * This hook fires an effect when the scroll position changes. The effect will
 * be provided with the before/after scroll positions. Note that the effect may
 * not be always run: if scrolling is disabled through `useScrollController`, it
 * will be a no-op.
 *
 * @see {@link useScrollController}
 */
export declare function useScrollPosition(effect: (position: ScrollPosition, lastPosition: ScrollPosition | null) => void, deps?: unknown[]): void;
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
export declare function useScrollPositionBlocker(): {
    /**
     * Takes an element, and keeps its screen position no matter what's getting
     * rendered above it, until the next render.
     */
    blockElementScrollPositionUntilNextRender: (el: HTMLElement) => void;
};
export {};
//# sourceMappingURL=index.d.ts.map