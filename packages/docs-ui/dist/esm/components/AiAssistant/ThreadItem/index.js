import clsx from "clsx";
import React from "react";
import { DotsLoading, MarkdownContent, QuestionMarkIcon } from "../../../components";
import { ExclamationCircle, Sparkles } from "@medusajs/icons";
import { AiAssistantThreadItemActions } from "./Actions";
export const AiAssistantThreadItem = ({ item }) => {
    return (React.createElement("div", { className: clsx("p-docs_1 flex justify-start gap-docs_1 items-start", "text-medusa-fg-subtle border-solid border-0 border-b", "border-medusa-border-base text-medium relative", item.type === "question" && "bg-medusa-bg-base", item.type === "answer" && "bg-medusa-bg-subtle") },
        React.createElement("span", { className: clsx("border border-solid border-medusa-border-base", "rounded-docs_sm p-docs_0.125 bg-medusa-bg-component", "text-medusa-fg-muted flex") },
            item.type === "question" && React.createElement(QuestionMarkIcon, null),
            item.type === "answer" && React.createElement(Sparkles, null),
            item.type === "error" && React.createElement(ExclamationCircle, null)),
        React.createElement("div", { className: "md:max-w-[calc(100%-134px)] md:w-[calc(100%-134px)]" },
            item.type === "question" && React.createElement(React.Fragment, null, item.content),
            item.type === "answer" && (React.createElement(React.Fragment, null,
                !item.question_id && item.content.length === 0 && React.createElement(DotsLoading, null),
                React.createElement(MarkdownContent, null, item.content))),
            item.type === "error" && (React.createElement("span", { className: "text-medusa-fg-error" }, item.content))),
        item.type === "answer" && item.question_id && (React.createElement(AiAssistantThreadItemActions, { item: item }))));
};
