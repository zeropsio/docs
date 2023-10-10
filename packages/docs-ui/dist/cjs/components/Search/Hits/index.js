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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHits = exports.SearchHitsWrapper = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const react_instantsearch_1 = require("react-instantsearch");
const NoResults_1 = require("../NoResults");
const GroupName_1 = require("./GroupName");
const providers_1 = require("../../../providers");
const Link_1 = require("../../../components/Link");
const SearchHitsWrapper = (_a) => {
    var { configureProps, indices } = _a, rest = __rest(_a, ["configureProps", "indices"]);
    const { status } = (0, react_instantsearch_1.useInstantSearch)();
    const [hasNoResults, setHashNoResults] = (0, react_1.useState)({
        [indices[0]]: false,
        [indices[1]]: false,
    });
    const showNoResults = (0, react_1.useMemo)(() => {
        return Object.values(hasNoResults).every((value) => value === true);
    }, [hasNoResults]);
    const setNoResults = (index, value) => {
        setHashNoResults((prev) => (Object.assign(Object.assign({}, prev), { [index]: value })));
    };
    return (react_1.default.createElement("div", { className: "h-full overflow-auto" },
        status !== "loading" && showNoResults && react_1.default.createElement(NoResults_1.SearchNoResult, null),
        indices.map((indexName, index) => (react_1.default.createElement(react_instantsearch_1.Index, { indexName: indexName, key: index },
            react_1.default.createElement(exports.SearchHits, Object.assign({ indexName: indexName, setNoResults: setNoResults }, rest)),
            react_1.default.createElement(react_instantsearch_1.Configure, Object.assign({}, configureProps)))))));
};
exports.SearchHitsWrapper = SearchHitsWrapper;
const SearchHits = ({ indexName, setNoResults, checkInternalPattern, }) => {
    const { hits } = (0, react_instantsearch_1.useHits)();
    const { status } = (0, react_instantsearch_1.useInstantSearch)();
    const { setIsOpen } = (0, providers_1.useSearch)();
    // group by lvl0
    const grouped = (0, react_1.useMemo)(() => {
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
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("overflow-auto", "[&_mark]:bg-medusa-bg-highlight", "[&_mark]:text-medusa-fg-interactive") }, Object.keys(grouped).map((groupName, index) => (react_1.default.createElement(react_1.Fragment, { key: index },
        react_1.default.createElement(GroupName_1.SearchHitGroupName, { name: groupName }),
        grouped[groupName].map((item, index) => (react_1.default.createElement("div", { className: (0, clsx_1.default)("gap-docs_0.25 relative flex flex-1 flex-col p-docs_0.5", "overflow-x-hidden text-ellipsis whitespace-nowrap break-words", "hover:bg-medusa-bg-base-hover", "focus:bg-medusa-bg-base-hover", "last:mb-docs_1 focus:outline-none"), key: index, tabIndex: index, "data-hit": true, onClick: (e) => {
                var _a;
                const target = e.target;
                if (target.tagName.toLowerCase() === "div") {
                    (_a = target.querySelector("a")) === null || _a === void 0 ? void 0 : _a.click();
                }
            } },
            react_1.default.createElement("span", { className: (0, clsx_1.default)("text-compact-small-plus text-medusa-fg-base", "max-w-full") },
                react_1.default.createElement(react_instantsearch_1.Snippet, { attribute: [
                        "hierarchy",
                        item.type && item.type !== "content"
                            ? item.type
                            : getLastAvailableHeirarchy(item) ||
                                item.hierarchy.lvl1 ||
                                "",
                    ], hit: item, separator: "." })),
            item.type !== "lvl1" && (react_1.default.createElement("span", { className: "text-compact-small text-medusa-fg-subtle" },
                react_1.default.createElement(react_instantsearch_1.Snippet, { attribute: item.content
                        ? "content"
                        : [
                            "hierarchy",
                            item.type || getLastAvailableHeirarchy(item),
                        ], hit: item }))),
            react_1.default.createElement(Link_1.Link, { href: item.url, className: "absolute top-0 left-0 h-full w-full", target: "_self", onClick: (e) => {
                    if (checkIfInternal(item.url)) {
                        e.preventDefault();
                        window.location.href = item.url;
                        setIsOpen(false);
                    }
                } })))))))));
};
exports.SearchHits = SearchHits;
