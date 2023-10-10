"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AiAssistantCommandIcon, Badge, Button, InputText, Kbd, SearchSuggestionItem, SearchHitGroupName, Tooltip, Link, } from "../../components";
import { useAiAssistant, useSearch } from "../../providers";
import { ArrowUturnLeft, XMarkMini } from "@medusajs/icons";
import clsx from "clsx";
import { useSearchNavigation } from "../../hooks";
import { AiAssistantThreadItem } from "./ThreadItem";
import useResizeObserver from "@react-hook/resize-observer";
export const AiAssistant = () => {
    const [question, setQuestion] = useState("");
    // this helps set the `order` field of the threadtype
    const [messagesCount, setMessagesCount] = useState(0);
    const [thread, setThread] = useState([]);
    const [answer, setAnswer] = useState("");
    const [identifiers, setIdentifiers] = useState(null);
    const [loading, setLoading] = useState(false);
    const { getAnswer } = useAiAssistant();
    const { setCommand } = useSearch();
    const inputRef = useRef(null);
    const contentRef = useRef(null);
    const suggestions = [
        {
            title: "FAQ",
            items: [
                "What is Medusa?",
                "How can I create an ecommerce store with Medusa?",
                "How can I build a marketplace with Medusa?",
                "How can I build subscription-based purchases with Medusa?",
                "How can I build digital products with Medusa?",
                "What can I build with Medusa?",
                "What is Medusa Admin?",
                "How do I configure the database in Medusa?",
            ],
        },
    ];
    const handleSubmit = (selectedQuestion) => {
        if (!(selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.length) && !question.length) {
            return;
        }
        setLoading(true);
        setAnswer("");
        setThread((prevThread) => [
            ...prevThread,
            {
                type: "question",
                content: selectedQuestion || question,
                order: getNewOrder(prevThread),
            },
        ]);
        setMessagesCount((prev) => prev + 1);
    };
    useSearchNavigation({
        getInputElm: () => inputRef.current,
        focusInput: () => { var _a; return (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); },
        handleSubmit,
    });
    const sortThread = (threadArr) => {
        const sortedThread = [...threadArr];
        sortedThread.sort((itemA, itemB) => {
            if (itemA.order < itemB.order) {
                return -1;
            }
            return itemA.order < itemB.order ? 1 : 0;
        });
        return sortedThread;
    };
    const getNewOrder = (prevThread) => {
        const sortedThread = sortThread(prevThread);
        return sortedThread.length === 0
            ? messagesCount + 1
            : sortedThread[prevThread.length - 1].order + 1;
    };
    const setError = (logMessage) => {
        var _a;
        if (logMessage === null || logMessage === void 0 ? void 0 : logMessage.length) {
            console.error(`[AI ERROR]: ${logMessage}`);
        }
        setThread((prevThread) => [
            ...prevThread,
            {
                type: "error",
                content: "I'm sorry, but I'm having trouble connecting to my knowledge base. Please try again. If the issue keeps persisting, please consider reporting an issue.",
                order: getNewOrder(prevThread),
            },
        ]);
        setMessagesCount((prev) => prev + 1);
        setLoading(false);
        setQuestion("");
        setAnswer("");
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const scrollToBottom = () => {
        var _a;
        const parent = (_a = contentRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
        parent.scrollTop = parent.scrollHeight;
    };
    const lastAnswerIndex = useMemo(() => {
        const index = thread.reverse().findIndex((item) => item.type === "answer");
        return index !== -1 ? index : 0;
    }, [thread]);
    const process_stream = useCallback((response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
        if (!reader) {
            return;
        }
        const decoder = new TextDecoder("utf-8");
        const delimiter = "\u241E";
        const delimiterBytes = new TextEncoder().encode(delimiter);
        let buffer = new Uint8Array();
        const findDelimiterIndex = (arr) => {
            for (let i = 0; i < arr.length - delimiterBytes.length + 1; i++) {
                let found = true;
                for (let j = 0; j < delimiterBytes.length; j++) {
                    if (arr[i + j] !== delimiterBytes[j]) {
                        found = false;
                        break;
                    }
                }
                if (found) {
                    return i;
                }
            }
            return -1;
        };
        let result;
        let loop = true;
        while (loop) {
            result = yield reader.read();
            if (result.done) {
                loop = false;
                continue;
            }
            buffer = new Uint8Array([...buffer, ...result.value]);
            let delimiterIndex;
            while ((delimiterIndex = findDelimiterIndex(buffer)) !== -1) {
                const chunkBytes = buffer.slice(0, delimiterIndex);
                const chunkText = decoder.decode(chunkBytes);
                buffer = buffer.slice(delimiterIndex + delimiterBytes.length);
                const chunk = JSON.parse(chunkText).chunk;
                if (chunk.type === "partial_answer") {
                    setAnswer((prevAnswer) => {
                        return prevAnswer + chunk.content.text;
                    });
                }
                else if (chunk.type === "identifiers") {
                    setIdentifiers(chunk.content);
                }
                else if (chunk.type === "error") {
                    setError(chunk.content.reason);
                    loop = false;
                    return;
                }
            }
        }
        setLoading(false);
        setQuestion("");
    }), []);
    const fetchAnswer = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield getAnswer(question, identifiers === null || identifiers === void 0 ? void 0 : identifiers.thread_id);
            if (response.status === 200) {
                yield process_stream(response);
            }
            else {
                const message = yield response.text();
                setError(message);
            }
        }
        catch (error) {
            setError(JSON.stringify(error));
        }
    }), [question, identifiers, process_stream]);
    useEffect(() => {
        if (loading && !answer) {
            void fetchAnswer();
        }
    }, [loading, fetchAnswer]);
    useEffect(() => {
        var _a, _b;
        if (!loading &&
            answer.length &&
            ((_a = thread[lastAnswerIndex]) === null || _a === void 0 ? void 0 : _a.content) !== answer) {
            setThread((prevThread) => [
                ...prevThread,
                {
                    type: "answer",
                    content: answer,
                    question_id: identifiers === null || identifiers === void 0 ? void 0 : identifiers.question_answer_id,
                    order: getNewOrder(prevThread),
                },
            ]);
            setAnswer("");
            setMessagesCount((prev) => prev + 1);
            (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    }, [loading, answer, thread, lastAnswerIndex, inputRef.current]);
    useResizeObserver(contentRef, () => {
        if (!loading) {
            return;
        }
        scrollToBottom();
    });
    const getThreadItems = useCallback(() => {
        const sortedThread = sortThread(thread);
        return sortedThread.map((item, index) => (React.createElement(AiAssistantThreadItem, { item: item, key: index })));
    }, [thread]);
    return (React.createElement("div", { className: "h-full" },
        React.createElement("div", { className: clsx("flex gap-docs_1 px-docs_1 py-docs_0.75", "h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base relative") },
            React.createElement(Button, { variant: "clear", onClick: () => setCommand(null), className: "text-medusa-fg-subtle p-[5px]" },
                React.createElement(ArrowUturnLeft, null)),
            React.createElement(InputText, { value: question, onChange: (e) => setQuestion(e.target.value), className: clsx("bg-transparent border-0 focus:outline-none hover:!bg-transparent", "shadow-none flex-1 text-medusa-fg-base", "disabled:!bg-transparent disabled:cursor-not-allowed"), placeholder: "Ask me a question about Medusa...", autoFocus: true, passedRef: inputRef, disabled: loading }),
            React.createElement(Button, { variant: "clear", onClick: () => {
                    var _a;
                    setQuestion("");
                    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }, className: clsx("text-medusa-fg-subtle p-[5px]", "absolute top-docs_0.75 right-docs_1", "hover:bg-medusa-bg-base-hover rounded-docs_sm", question.length === 0 && "hidden") },
                React.createElement(XMarkMini, null))),
        React.createElement("div", { className: "h-[calc(100%-120px)] md:h-[calc(100%-114px)] lg:max-h-[calc(100%-114px)] lg:min-h-[calc(100%-114px)] overflow-auto" },
            React.createElement("div", { ref: contentRef },
                !thread.length && (React.createElement("div", { className: "mx-docs_0.5" }, suggestions.map((suggestion, index) => (React.createElement(React.Fragment, { key: index },
                    React.createElement(SearchHitGroupName, { name: suggestion.title }),
                    suggestion.items.map((item, itemIndex) => (React.createElement(SearchSuggestionItem, { onClick: () => {
                            setQuestion(item);
                            handleSubmit(item);
                        }, key: itemIndex, tabIndex: itemIndex }, item)))))))),
                getThreadItems(),
                (answer.length || loading) && (React.createElement(AiAssistantThreadItem, { item: {
                        type: "answer",
                        content: answer,
                        order: 0,
                    } })))),
        React.createElement("div", { className: clsx("py-docs_0.75 flex items-center justify-between px-docs_1", "border-0 border-solid", "border-medusa-border-base border-t", "bg-medusa-bg-base h-[57px]") },
            React.createElement(Tooltip, { tooltipChildren: React.createElement(React.Fragment, null,
                    "This site is protected by reCAPTCHA and the",
                    " ",
                    React.createElement(Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    React.createElement(Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply") },
                React.createElement("div", { className: clsx("flex items-center gap-docs_0.75 text-compact-small-plus") },
                    React.createElement(AiAssistantCommandIcon, null),
                    React.createElement("span", { className: "text-medusa-fg-subtle" }, "Medusa AI Assistant"),
                    React.createElement(Badge, { variant: "purple" }, "Beta"))),
            React.createElement("div", { className: "hidden items-center gap-docs_1 md:flex" },
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    thread.length === 0 && (React.createElement(React.Fragment, null,
                        React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigate FAQ"),
                        React.createElement("span", { className: "gap-docs_0.25 flex" },
                            React.createElement(Kbd, null, "\u2191"),
                            React.createElement(Kbd, null, "\u2193")))),
                    thread.length > 0 && (React.createElement("span", { className: clsx("text-medusa-fg-muted", "text-compact-x-small") }, "Chat is cleared on exit"))),
                React.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    React.createElement("span", { className: clsx("text-medusa-fg-subtle", "text-compact-x-small") }, "Ask Question"),
                    React.createElement(Kbd, null, "\u21B5"))))));
};
