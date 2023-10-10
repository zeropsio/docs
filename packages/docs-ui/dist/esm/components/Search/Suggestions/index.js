"use client";
import React from "react";
import { useInstantSearch } from "react-instantsearch";
import { SearchHitGroupName } from "../Hits/GroupName";
import { useSearch } from "../../../providers";
import { SearchSuggestionItem } from "./Item";
import { Badge } from "../../../components";
export const SearchSuggestions = ({ suggestions }) => {
    const { setIndexUiState } = useInstantSearch();
    const { commands, setCommand } = useSearch();
    return (React.createElement("div", { className: "h-full overflow-auto" },
        commands.length > 0 && (React.createElement(React.Fragment, null,
            React.createElement(SearchHitGroupName, { name: "Commands" }),
            commands.map((command, index) => (React.createElement(SearchSuggestionItem, { onClick: () => setCommand(command), key: index, tabIndex: index, className: "gap-docs_0.75" },
                React.createElement(React.Fragment, null,
                    command.icon,
                    React.createElement("span", null, command.title),
                    command.badge && React.createElement(Badge, Object.assign({}, command.badge)))))))),
        suggestions.map((suggestion, index) => (React.createElement(React.Fragment, { key: index },
            React.createElement(SearchHitGroupName, { name: suggestion.title }),
            suggestion.items.map((item, itemIndex) => (React.createElement(SearchSuggestionItem, { onClick: () => setIndexUiState({
                    query: item,
                }), key: itemIndex, tabIndex: commands.length + itemIndex }, item))))))));
};
