"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSuggestions = void 0;
const react_1 = __importDefault(require("react"));
const react_instantsearch_1 = require("react-instantsearch");
const GroupName_1 = require("../Hits/GroupName");
const providers_1 = require("../../../providers");
const Item_1 = require("./Item");
const components_1 = require("../../../components");
const SearchSuggestions = ({ suggestions }) => {
    const { setIndexUiState } = (0, react_instantsearch_1.useInstantSearch)();
    const { commands, setCommand } = (0, providers_1.useSearch)();
    return (react_1.default.createElement("div", { className: "h-full overflow-auto" },
        commands.length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(GroupName_1.SearchHitGroupName, { name: "Commands" }),
            commands.map((command, index) => (react_1.default.createElement(Item_1.SearchSuggestionItem, { onClick: () => setCommand(command), key: index, tabIndex: index, className: "gap-docs_0.75" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    command.icon,
                    react_1.default.createElement("span", null, command.title),
                    command.badge && react_1.default.createElement(components_1.Badge, Object.assign({}, command.badge)))))))),
        suggestions.map((suggestion, index) => (react_1.default.createElement(react_1.default.Fragment, { key: index },
            react_1.default.createElement(GroupName_1.SearchHitGroupName, { name: suggestion.title }),
            suggestion.items.map((item, itemIndex) => (react_1.default.createElement(Item_1.SearchSuggestionItem, { onClick: () => setIndexUiState({
                    query: item,
                }), key: itemIndex, tabIndex: commands.length + itemIndex }, item))))))));
};
exports.SearchSuggestions = SearchSuggestions;
