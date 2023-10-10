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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const react_1 = __importStar(require("react"));
const react_instantsearch_1 = require("react-instantsearch");
const clsx_1 = __importDefault(require("clsx"));
const EmptyQueryBoundary_1 = require("./EmptyQueryBoundary");
const Suggestions_1 = require("./Suggestions");
const providers_1 = require("../../providers");
const utils_1 = require("../../utils");
const Hits_1 = require("./Hits");
const components_1 = require("../../components");
const icons_1 = require("@medusajs/icons");
const hooks_1 = require("../../hooks");
const Search = ({ algolia, suggestions, isLoading = false, checkInternalPattern, filterOptions = [], }) => {
    const { isOpen, setIsOpen, defaultFilters, searchClient, modalRef } = (0, providers_1.useSearch)();
    const [filters, setFilters] = (0, react_1.useState)(defaultFilters);
    const formattedFilters = (0, react_1.useMemo)(() => {
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
    const searchBoxRef = (0, react_1.useRef)(null);
    const focusSearchInput = () => { var _a, _b; return (_b = (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input")) === null || _b === void 0 ? void 0 : _b.focus(); };
    (0, react_1.useEffect)(() => {
        if (!(0, utils_1.checkArraySameElms)(defaultFilters, filters)) {
            setFilters(defaultFilters);
        }
    }, [defaultFilters]);
    (0, react_1.useEffect)(() => {
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
    (0, hooks_1.useSearchNavigation)({
        getInputElm: () => { var _a; return (_a = searchBoxRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input"); },
        focusInput: focusSearchInput,
        keyboardProps: {
            isLoading,
        },
    });
    return (react_1.default.createElement("div", { className: "h-full" },
        react_1.default.createElement(react_instantsearch_1.InstantSearch, { indexName: algolia.mainIndexName, searchClient: searchClient },
            react_1.default.createElement("div", { className: (0, clsx_1.default)("bg-medusa-bg-base flex") },
                react_1.default.createElement(react_instantsearch_1.SearchBox, { classNames: {
                        root: (0, clsx_1.default)("h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base", "bg-transparent"),
                        form: (0, clsx_1.default)("h-full md:rounded-t-docs_xl bg-transparent"),
                        input: (0, clsx_1.default)("w-full h-full pl-docs_3 text-medusa-fg-base", "placeholder:text-medusa-fg-muted", "md:rounded-t-docs_xl text-compact-medium bg-transparent", "appearance-none search-cancel:hidden border-0 active:outline-none focus:outline-none"),
                        submit: (0, clsx_1.default)("absolute top-[18px] left-docs_1 btn-clear p-0"),
                        reset: (0, clsx_1.default)("absolute top-docs_0.75 right-docs_1 hover:bg-medusa-bg-base-hover", "p-[5px] md:rounded-docs_DEFAULT btn-clear"),
                        loadingIndicator: (0, clsx_1.default)("absolute top-[18px] right-docs_1"),
                    }, submitIconComponent: () => (react_1.default.createElement(icons_1.MagnifyingGlass, { className: "text-medusa-fg-muted" })), resetIconComponent: () => (react_1.default.createElement(icons_1.XMark, { className: "hidden md:block text-medusa-fg-subtle" })), placeholder: "Find something...", autoFocus: true, formRef: searchBoxRef }),
                react_1.default.createElement(components_1.Button, { variant: "clear", className: (0, clsx_1.default)("bg-medusa-bg-base block md:hidden", "border-0 border-solid", "border-medusa-border-base border-b", "pr-docs_1"), onClick: () => setIsOpen(false) },
                    react_1.default.createElement(icons_1.XMark, { className: "text-medusa-fg-muted" }))),
            react_1.default.createElement("div", { className: "mx-docs_0.5 md:flex-initial h-[calc(100%-120px)] md:h-[calc(100%-114px)] lg:max-h-[calc(100%-114px)] lg:min-h-[calc(100%-114px)]" },
                react_1.default.createElement(EmptyQueryBoundary_1.SearchEmptyQueryBoundary, { fallback: react_1.default.createElement(Suggestions_1.SearchSuggestions, { suggestions: suggestions }) },
                    react_1.default.createElement(Hits_1.SearchHitsWrapper, { configureProps: {
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
        react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.75 flex items-center justify-between px-docs_1", "border-0 border-solid h-[57px]", "border-medusa-border-base border-t", "bg-medusa-bg-base") },
            filterOptions.length && (react_1.default.createElement(components_1.SelectBadge, { multiple: true, options: filterOptions, value: filters, setSelected: (value) => setFilters(Array.isArray(value) ? [...value] : [value]), addSelected: (value) => setFilters((prev) => [...prev, value]), removeSelected: (value) => setFilters((prev) => prev.filter((v) => v !== value)), showClearButton: false, placeholder: "Filters", handleAddAll: (isAllSelected) => {
                    if (isAllSelected) {
                        setFilters(defaultFilters);
                    }
                    else {
                        setFilters(filterOptions.map((option) => option.value));
                    }
                } })),
            react_1.default.createElement("div", { className: "hidden items-center gap-docs_1 md:flex" },
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigation"),
                    react_1.default.createElement("span", { className: "gap-docs_0.25 flex" },
                        react_1.default.createElement(components_1.Kbd, null, "\u2191"),
                        react_1.default.createElement(components_1.Kbd, null, "\u2193"))),
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Open Result"),
                    react_1.default.createElement(components_1.Kbd, null, "\u21B5"))))));
};
exports.Search = Search;
