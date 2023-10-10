"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { Fragment, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Configure, Index, Snippet, useHits, useInstantSearch, } from "react-instantsearch";
import { SearchNoResult } from "../NoResults";
import { SearchHitGroupName } from "./GroupName";
import { useSearch } from "../../../providers";
import { Link } from "../../../components/Link";
export const SearchHitsWrapper = (_a) => {
    var { configureProps, indices } = _a, rest = __rest(_a, ["configureProps", "indices"]);
    const { status } = useInstantSearch();
    const [hasNoResults, setHashNoResults] = useState({
        [indices[0]]: false,
        [indices[1]]: false,
    });
    const showNoResults = useMemo(() => {
        return Object.values(hasNoResults).every((value) => value === true);
    }, [hasNoResults]);
    const setNoResults = (index, value) => {
        setHashNoResults((prev) => (Object.assign(Object.assign({}, prev), { [index]: value })));
    };
    return (React.createElement("div", { className: "h-full overflow-auto" },
        status !== "loading" && showNoResults && React.createElement(SearchNoResult, null),
        indices.map((indexName, index) => (React.createElement(Index, { indexName: indexName, key: index },
            React.createElement(SearchHits, Object.assign({ indexName: indexName, setNoResults: setNoResults }, rest)),
            React.createElement(Configure, Object.assign({}, configureProps)))))));
};
export const SearchHits = ({ indexName, setNoResults, checkInternalPattern, }) => {
    const { hits } = useHits();
    const { status } = useInstantSearch();
    const { setIsOpen } = useSearch();
    // group by lvl0
    const grouped = useMemo(() => {
        const grouped = {};
        hits.forEach((hit) => {
            if (hit.hierarchy.lvl0) {
                if (!grouped[hit.hierarchy.lvl0]) {
                    grouped[hit.hierarchy.lvl0] = [];
                }
                grouped[hit.hierarchy.lvl0].push(hit);
            }
        });
        return grouped;
    }, [hits]);
    useEffect(() => {
        if (status !== "loading" && status !== "stalled") {
            setNoResults(indexName, hits.length === 0);
        }
    }, [hits, status]);
    const getLastAvailableHeirarchy = (item) => {
        return (Object.keys(item.hierarchy)
            .reverse()
            .find((key) => item.hierarchy[key] !== null &&
            item.hierarchy[key] !== item.content) || "");
    };
    const checkIfInternal = (url) => {
        if (!checkInternalPattern) {
            return false;
        }
        return checkInternalPattern.test(url);
    };
    return (React.createElement("div", { className: clsx("overflow-auto", "[&_mark]:bg-medusa-bg-highlight", "[&_mark]:text-medusa-fg-interactive") }, Object.keys(grouped).map((groupName, index) => (React.createElement(Fragment, { key: index },
        React.createElement(SearchHitGroupName, { name: groupName }),
        grouped[groupName].map((item, index) => (React.createElement("div", { className: clsx("gap-docs_0.25 relative flex flex-1 flex-col p-docs_0.5", "overflow-x-hidden text-ellipsis whitespace-nowrap break-words", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "last:mb-docs_1 focus:outline-none"), key: index, tabIndex: index, "data-hit": true, onClick: (e) => {
                var _a;
                const target = e.target;
                if (target.tagName.toLowerCase() === "div") {
                    (_a = target.querySelector("a")) === null || _a === void 0 ? void 0 : _a.click();
                }
            } },
            React.createElement("span", { className: clsx("text-compact-small-plus text-medusa-fg-base", "max-w-full") },
                React.createElement(Snippet, { attribute: [
                        "hierarchy",
                        item.type && item.type !== "content"
                            ? item.type
                            : getLastAvailableHeirarchy(item) ||
                                item.hierarchy.lvl1 ||
                                "",
                    ], hit: item, separator: "." })),
            item.type !== "lvl1" && (React.createElement("span", { className: "text-compact-small text-medusa-fg-subtle" },
                React.createElement(Snippet, { attribute: item.content
                        ? "content"
                        : [
                            "hierarchy",
                            item.type || getLastAvailableHeirarchy(item),
                        ], hit: item }))),
            React.createElement(Link, { href: item.url, className: "absolute top-0 left-0 h-full w-full", target: "_self", onClick: (e) => {
                    if (checkIfInternal(item.url)) {
                        e.preventDefault();
                        window.location.href = item.url;
                        setIsOpen(false);
                    }
                } })))))))));
};
