"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch";
import clsx from "clsx";
import { SearchEmptyQueryBoundary } from "./EmptyQueryBoundary";
import { SearchSuggestions } from "./Suggestions";
import { useSearch } from "../../providers";
import { checkArraySameElms } from "../../utils";
import { SearchHitsWrapper } from "./Hits";
import { Button, Kbd, SelectBadge } from "../../components";
import { MagnifyingGlass, XMark } from "@medusajs/icons";
import { useSearchNavigation } from "../../hooks";
export const Search = ({ algolia, suggestions, isLoading = false, checkInternalPattern, filterOptions = [], }) => {
    const { isOpen, setIsOpen, defaultFilters, searchClient, modalRef } = useSearch();
    const [filters, setFilters] = useState(defaultFilters);
    const formattedFilters = useMemo(() => {
        let formatted = "";
        filters.forEach((filter) => {
            const split = filter.split("_");
            split.forEach((f) => {
                if (formatted.length) {
                    formatted += " OR ";
                }
                formatted += `_tags:${f}`;
            });
        });
        return formatted;
    }, [filters]);
    const searchBoxRef = useRef(null);
    const focusSearchInput = () => { var _a, _b; return (_b = (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input")) === null || _b === void 0 ? void 0 : _b.focus(); };
    useEffect(() => {
        if (!checkArraySameElms(defaultFilters, filters)) {
            setFilters(defaultFilters);
        }
    }, [defaultFilters]);
    useEffect(() => {
        var _a, _b;
        if (isOpen && searchBoxRef.current) {
            focusSearchInput();
        }
        else if (!isOpen) {
            const focusedItem = (_a = modalRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(":focus");
            if (focusedItem &&
                focusedItem === ((_b = searchBoxRef.current) === null || _b === void 0 ? void 0 : _b.querySelector("input"))) {
                // remove focus
                focusedItem.blur();
            }
        }
    }, [isOpen]);
    useSearchNavigation({
        getInputElm: () => { var _a; return (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input"); },
        focusInput: focusSearchInput,
        keyboardProps: {
            isLoading,
        },
    });
    return (React.createElement("div", { className: "h-full" },
        React.createElement(InstantSearch, { indexName: algolia.mainIndexName, searchClient: searchClient },
            React.createElement("div", { className: clsx("bg-medusa-bg-base flex") },
                React.createElement(SearchBox, { classNames: {
                        root: clsx("h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base", "bg-transparent"),
                        form: clsx("h-full md:rounded-t-docs_xl bg-transparent"),
                        input: clsx("w-full h-full pl-docs_3 text-medusa-fg-base", "placeholder:text-medusa-fg-muted", "md:rounded-t-docs_xl text-compact-medium bg-transparent", "appearance-none search-cancel:hidden border-0 active:outline-none focus:outline-none"),
                        submit: clsx("absolute top-[18px] left-docs_1 btn-clear p-0"),
                        reset: clsx("absolute top-docs_0.75 right-docs_1 hover:bg-medusa-bg-base-hover", "p-[5px] md:rounded-docs_DEFAULT btn-clear"),
                        loadingIndicator: clsx("absolute top-[18px] right-docs_1"),
                    }, submitIconComponent: () => (React.createElement(MagnifyingGlass, { className: "text-medusa-fg-muted" })), resetIconComponent: () => (React.createElement(XMark, { className: "hidden md:block text-medusa-fg-subtle" })), placeholder: "Find something...", autoFocus: true, formRef: searchBoxRef }),
                React.createElement(Button, { variant: "clear", className: clsx("bg-medusa-bg-base block md:hidden", "border-0 border-solid", "border-medusa-border-base border-b", "pr-docs_1"), onClick: () => setIsOpen(false) },
                    React.createElement(XMark, { className: "text-medusa-fg-muted" }))),
            React.createElement("div", { className: "mx-docs_0.5 md:flex-initial h-[calc(100%-120px)] md:h-[calc(100%-114px)] lg:max-h-[calc(100%-114px)] lg:min-h-[calc(100%-114px)]" },
                React.createElement(SearchEmptyQueryBoundary, { fallback: React.createElement(SearchSuggestions, { suggestions: suggestions }) },
                    React.createElement(SearchHitsWrapper, { configureProps: {
                            filters: formattedFilters,
                            attributesToSnippet: [
                                "content",
                                "hierarchy.lvl1",
                                "hierarchy.lvl2",
                                "hierarchy.lvl3",
                            ],
                            attributesToHighlight: [
                                "content",
                                "hierarchy.lvl1",
                                "hierarchy.lvl2",
                                "hierarchy.lvl3",
                            ],
                        }, indices: algolia.indices, checkInternalPattern: checkInternalPattern })))),
        React.createElement("div", { className: clsx("py-docs_0.75 flex items-center justify-between px-docs_1", "border-0 border-solid h-[57px]", "border-medusa-border-base border-t", "bg-medusa-bg-base") },
            filterOptions.length && (React.createElement(SelectBadge, { multiple: true, options: filterOptions, value: filters, setSelected: (value) => setFilters(Array.isArray(value) ? [...value] : [value]), addSelected: (value) => setFilters((prev) => [...prev, value]), removeSelected: (value) => setFilters((prev) => prev.filter((v) => v !== value)), showClearButton: false, placeholder: "Filters", handleAddAll: (isAllSelected) => {
                    if (isAllSelected) {
                        setFilters(defaultFilters);
                    }
                    else {
                        setFilters(filterOptions.map((option) => option.value));
                    }
                } })),
            React.createElement("div", { className: "hidden items-center gap-docs_1 md:flex" },
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigation"),
                    React.createElement("span", { className: "gap-docs_0.25 flex" },
                        React.createElement(Kbd, null, "\u2191"),
                        React.createElement(Kbd, null, "\u2193"))),
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Open Result"),
                    React.createElement(Kbd, null, "\u21B5"))))));
};
