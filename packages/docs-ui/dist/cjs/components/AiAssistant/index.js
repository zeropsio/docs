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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistant = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const providers_1 = require("../../providers");
const icons_1 = require("@medusajs/icons");
const clsx_1 = __importDefault(require("clsx"));
const hooks_1 = require("../../hooks");
const ThreadItem_1 = require("./ThreadItem");
const resize_observer_1 = __importDefault(require("@react-hook/resize-observer"));
const AiAssistant = () => {
    const [question, setQuestion] = (0, react_1.useState)("");
    // this helps set the `order` field of the threadtype
    const [messagesCount, setMessagesCount] = (0, react_1.useState)(0);
    const [thread, setThread] = (0, react_1.useState)([]);
    const [answer, setAnswer] = (0, react_1.useState)("");
    const [identifiers, setIdentifiers] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { getAnswer } = (0, providers_1.useAiAssistant)();
    const { setCommand } = (0, providers_1.useSearch)();
    const inputRef = (0, react_1.useRef)(null);
    const contentRef = (0, react_1.useRef)(null);
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
    (0, hooks_1.useSearchNavigation)({
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
    const lastAnswerIndex = (0, react_1.useMemo)(() => {
        const index = thread.reverse().findIndex((item) => item.type === "answer");
        return index !== -1 ? index : 0;
    }, [thread]);
    const process_stream = (0, react_1.useCallback)((response) => __awaiter(void 0, void 0, void 0, function* () {
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
    const fetchAnswer = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, react_1.useEffect)(() => {
        if (loading && !answer) {
            void fetchAnswer();
        }
    }, [loading, fetchAnswer]);
    (0, react_1.useEffect)(() => {
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
    (0, resize_observer_1.default)(contentRef, () => {
        if (!loading) {
            return;
        }
        scrollToBottom();
    });
    const getThreadItems = (0, react_1.useCallback)(() => {
        const sortedThread = sortThread(thread);
        return sortedThread.map((item, index) => (react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: item, key: index })));
    }, [thread]);
    return (react_1.default.createElement("div", { className: "h-full" },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_1 px-docs_1 py-docs_0.75", "h-[57px] w-full md:rounded-t-docs_xl relative border-0 border-solid", "border-b border-medusa-border-base relative") },
            react_1.default.createElement(components_1.Button, { variant: "clear", onClick: () => setCommand(null), className: "text-medusa-fg-subtle p-[5px]" },
                react_1.default.createElement(icons_1.ArrowUturnLeft, null)),
            react_1.default.createElement(components_1.InputText, { value: question, onChange: (e) => setQuestion(e.target.value), className: (0, clsx_1.default)("bg-transparent border-0 focus:outline-none hover:!bg-transparent", "shadow-none flex-1 text-medusa-fg-base", "disabled:!bg-transparent disabled:cursor-not-allowed"), placeholder: "Ask me a question about Medusa...", autoFocus: true, passedRef: inputRef, disabled: loading }),
            react_1.default.createElement(components_1.Button, { variant: "clear", onClick: () => {
                    var _a;
                    setQuestion("");
                    (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                }, className: (0, clsx_1.default)("text-medusa-fg-subtle p-[5px]", "absolute top-docs_0.75 right-docs_1", "hover:bg-medusa-bg-base-hover rounded-docs_sm", question.length === 0 && "hidden") },
                react_1.default.createElement(icons_1.XMarkMini, null))),
        react_1.default.createElement("div", { className: "h-[calc(100%-120px)] md:h-[calc(100%-114px)] lg:max-h-[calc(100%-114px)] lg:min-h-[calc(100%-114px)] overflow-auto" },
            react_1.default.createElement("div", { ref: contentRef },
                !thread.length && (react_1.default.createElement("div", { className: "mx-docs_0.5" }, suggestions.map((suggestion, index) => (react_1.default.createElement(react_1.default.Fragment, { key: index },
                    react_1.default.createElement(components_1.SearchHitGroupName, { name: suggestion.title }),
                    suggestion.items.map((item, itemIndex) => (react_1.default.createElement(components_1.SearchSuggestionItem, { onClick: () => {
                            setQuestion(item);
                            handleSubmit(item);
                        }, key: itemIndex, tabIndex: itemIndex }, item)))))))),
                getThreadItems(),
                (answer.length || loading) && (react_1.default.createElement(ThreadItem_1.AiAssistantThreadItem, { item: {
                        type: "answer",
                        content: answer,
                        order: 0,
                    } })))),
        react_1.default.createElement("div", { className: (0, clsx_1.default)("py-docs_0.75 flex items-center justify-between px-docs_1", "border-0 border-solid", "border-medusa-border-base border-t", "bg-medusa-bg-base h-[57px]") },
            react_1.default.createElement(components_1.Tooltip, { tooltipChildren: react_1.default.createElement(react_1.default.Fragment, null,
                    "This site is protected by reCAPTCHA and the",
                    " ",
                    react_1.default.createElement(components_1.Link, { href: "https://policies.google.com/privacy" }, "Google Privacy Policy"),
                    " ",
                    "and ",
                    react_1.default.createElement(components_1.Link, { href: "https://policies.google.com/terms" }, "ToS"),
                    " ",
                    "apply") },
                react_1.default.createElement("div", { className: (0, clsx_1.default)("flex items-center gap-docs_0.75 text-compact-small-plus") },
                    react_1.default.createElement(components_1.AiAssistantCommandIcon, null),
                    react_1.default.createElement("span", { className: "text-medusa-fg-subtle" }, "Medusa AI Assistant"),
                    react_1.default.createElement(components_1.Badge, { variant: "purple" }, "Beta"))),
            react_1.default.createElement("div", { className: "hidden items-center gap-docs_1 md:flex" },
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    thread.length === 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Navigate FAQ"),
                        react_1.default.createElement("span", { className: "gap-docs_0.25 flex" },
                            react_1.default.createElement(components_1.Kbd, null, "\u2191"),
                            react_1.default.createElement(components_1.Kbd, null, "\u2193")))),
                    thread.length > 0 && (react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-muted", "text-compact-x-small") }, "Chat is cleared on exit"))),
                react_1.default.createElement("div", { className: "flex items-center gap-docs_0.5" },
                    react_1.default.createElement("span", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "text-compact-x-small") }, "Ask Question"),
                    react_1.default.createElement(components_1.Kbd, null, "\u21B5"))))));
};
exports.AiAssistant = AiAssistant;
