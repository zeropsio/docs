"use strict";
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
exports.AiAssistantThreadItemActions = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const components_1 = require("../../../../components");
const icons_1 = require("@medusajs/icons");
const hooks_1 = require("../../../../hooks");
const providers_1 = require("../../../../providers");
const AiAssistantThreadItemActions = ({ item, }) => {
    const { isCopied, handleCopy } = (0, hooks_1.useCopy)(item.content);
    const [feedback, setFeedback] = (0, react_1.useState)(null);
    const { sendFeedback } = (0, providers_1.useAiAssistant)();
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
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("hidden md:flex gap-docs_0.25", "text-medusa-fg-muted", "sticky top-docs_1") },
        react_1.default.createElement(ActionButton, { onClick: handleCopy }, isCopied ? react_1.default.createElement(icons_1.Check, null) : react_1.default.createElement(icons_1.SquareTwoStack, null)),
        (feedback === null || feedback === "upvote") && (react_1.default.createElement(ActionButton, { onClick: () => __awaiter(void 0, void 0, void 0, function* () { return handleFeedback("upvote", item.question_id); }), className: (0, clsx_1.default)(feedback === "upvote" && "!text-medusa-fg-subtle") },
            react_1.default.createElement(components_1.ThumbUpIcon, null))),
        (feedback === null || feedback === "downvote") && (react_1.default.createElement(ActionButton, { onClick: () => __awaiter(void 0, void 0, void 0, function* () { return handleFeedback("downvote", item.question_id); }), className: (0, clsx_1.default)(feedback === "downvote" && "!text-medusa-fg-subtle") },
            react_1.default.createElement(components_1.ThumbDownIcon, null)))));
};
exports.AiAssistantThreadItemActions = AiAssistantThreadItemActions;
const ActionButton = (_a) => {
    var { children, className } = _a, props = __rest(_a, ["children", "className"]);
    return (react_1.default.createElement(components_1.Button, Object.assign({ variant: "clear", className: (0, clsx_1.default)("text-medusa-fg-muted hover:text-medusa-fg-subtle", "hover:bg-medusa-bg-subtle-hover", "p-docs_0.125 rounded-docs_sm", className) }, props), children));
};
