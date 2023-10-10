"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantThreadItem = void 0;
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importDefault(require("react"));
const components_1 = require("../../../components");
const icons_1 = require("@medusajs/icons");
const Actions_1 = require("./Actions");
const AiAssistantThreadItem = ({ item }) => {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("p-docs_1 flex justify-start gap-docs_1 items-start", "text-medusa-fg-subtle border-solid border-0 border-b", "border-medusa-border-base text-medium relative", item.type === "question" && "bg-medusa-bg-base", item.type === "answer" && "bg-medusa-bg-subtle") },
        react_1.default.createElement("span", { className: (0, clsx_1.default)("border border-solid border-medusa-border-base", "rounded-docs_sm p-docs_0.125 bg-medusa-bg-component", "text-medusa-fg-muted flex") },
            item.type === "question" && react_1.default.createElement(components_1.QuestionMarkIcon, null),
            item.type === "answer" && react_1.default.createElement(icons_1.Sparkles, null),
            item.type === "error" && react_1.default.createElement(icons_1.ExclamationCircle, null)),
        react_1.default.createElement("div", { className: "md:max-w-[calc(100%-134px)] md:w-[calc(100%-134px)]" },
            item.type === "question" && react_1.default.createElement(react_1.default.Fragment, null, item.content),
            item.type === "answer" && (react_1.default.createElement(react_1.default.Fragment, null,
                !item.question_id && item.content.length === 0 && react_1.default.createElement(components_1.DotsLoading, null),
                react_1.default.createElement(components_1.MarkdownContent, null, item.content))),
            item.type === "error" && (react_1.default.createElement("span", { className: "text-medusa-fg-error" }, item.content))),
        item.type === "answer" && item.question_id && (react_1.default.createElement(Actions_1.AiAssistantThreadItemActions, { item: item }))));
};
exports.AiAssistantThreadItem = AiAssistantThreadItem;
