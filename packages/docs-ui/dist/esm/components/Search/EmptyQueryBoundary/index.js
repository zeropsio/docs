"use client";
import React from "react";
import { useInstantSearch } from "react-instantsearch";
export const SearchEmptyQueryBoundary = ({ children, fallback, }) => {
    const { indexUiState } = useInstantSearch();
    if (!indexUiState.query) {
        return React.createElement(React.Fragment, null, fallback);
    }
    return React.createElement(React.Fragment, null, children);
};
