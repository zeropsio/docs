var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
import React, { useState } from "react";
import clsx from "clsx";
import { Button, ThumbDownIcon, ThumbUpIcon, } from "../../../../components";
import { Check, SquareTwoStack } from "@medusajs/icons";
import { useCopy } from "../../../../hooks";
import { useAiAssistant } from "../../../../providers";
export const AiAssistantThreadItemActions = ({ item, }) => {
    const { isCopied, handleCopy } = useCopy(item.content);
    const [feedback, setFeedback] = useState(null);
    const { sendFeedback } = useAiAssistant();
    const handleFeedback = (reaction, question_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!question_id || feedback) {
                return;
            }
            setFeedback(reaction);
            const response = yield sendFeedback(question_id, reaction);
            if (response.status !== 200) {
                console.error("Error sending feedback:", response.status);
            }
        }
        catch (error) {
            console.error("Error sending feedback:", error);
        }
    });
    return (React.createElement("div", { className: clsx("hidden md:flex gap-docs_0.25", "text-medusa-fg-muted", "sticky top-docs_1") },
        React.createElement(ActionButton, { onClick: handleCopy }, isCopied ? React.createElement(Check, null) : React.createElement(SquareTwoStack, null)),
        (feedback === null || feedback === "upvote") && (React.createElement(ActionButton, { onClick: () => __awaiter(void 0, void 0, void 0, function* () { return handleFeedback("upvote", item.question_id); }), className: clsx(feedback === "upvote" && "!text-medusa-fg-subtle") },
            React.createElement(ThumbUpIcon, null))),
        (feedback === null || feedback === "downvote") && (React.createElement(ActionButton, { onClick: () => __awaiter(void 0, void 0, void 0, function* () { return handleFeedback("downvote", item.question_id); }), className: clsx(feedback === "downvote" && "!text-medusa-fg-subtle") },
            React.createElement(ThumbDownIcon, null)))));
};
const ActionButton = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (React.createElement(Button, Object.assign({ variant: "clear", className: clsx("text-medusa-fg-muted hover:text-medusa-fg-subtle", "hover:bg-medusa-bg-subtle-hover", "p-docs_0.125 rounded-docs_sm", className) }, props), children));
};
