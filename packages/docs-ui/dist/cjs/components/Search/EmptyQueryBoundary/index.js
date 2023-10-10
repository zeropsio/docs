"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchEmptyQueryBoundary = void 0;
const react_1 = __importDefault(require("react"));
const react_instantsearch_1 = require("react-instantsearch");
const SearchEmptyQueryBoundary = ({ children, fallback, }) => {
    const { indexUiState } = (0, react_instantsearch_1.useInstantSearch)();
    if (!indexUiState.query) {
        return react_1.default.createElement(react_1.default.Fragment, null, fallback);
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.SearchEmptyQueryBoundary = SearchEmptyQueryBoundary;
