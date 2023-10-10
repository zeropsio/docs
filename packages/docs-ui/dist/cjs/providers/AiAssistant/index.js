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
exports.useAiAssistant = exports.AiAssistantProvider = void 0;
const react_1 = __importStar(require("react"));
const providers_1 = require("../../providers");
const components_1 = require("../../components");
const react_google_recaptcha_1 = __importDefault(require("react-google-recaptcha"));
const AiAssistantContext = (0, react_1.createContext)(null);
const AiAssistantProvider = ({ apiUrl, recaptchaSiteKey, websiteId, children, }) => {
    const { analytics } = (0, providers_1.useAnalytics)();
    const recaptchaRef = react_1.default.createRef();
    const getReCaptchaToken = () => __awaiter(void 0, void 0, void 0, function* () {
        if (recaptchaRef === null || recaptchaRef === void 0 ? void 0 : recaptchaRef.current) {
            const recaptchaToken = yield recaptchaRef.current.executeAsync();
            return recaptchaToken || "";
        }
        return "";
    });
    const sendRequest = (apiPath, method = "GET", headers, body) => __awaiter(void 0, void 0, void 0, function* () {
        return yield fetch(`${apiUrl}${apiPath}`, {
            method,
            headers: Object.assign({ "X-RECAPTCHA-TOKEN": yield getReCaptchaToken(), "X-WEBSITE-ID": websiteId }, headers),
            body,
        });
    });
    const getAnswer = (question, threadId) => __awaiter(void 0, void 0, void 0, function* () {
        const questionParam = encodeURI(question);
        return yield sendRequest(threadId
            ? `/query/v1/thread/${threadId}/stream?query=${questionParam}`
            : `/query/v1/stream?query=${questionParam}`);
    });
    const sendFeedback = (questionId, reaction) => __awaiter(void 0, void 0, void 0, function* () {
        return yield sendRequest(`/query/v1/question-answer/${questionId}/feedback`, "POST", {
            "Content-Type": "application/json",
        }, JSON.stringify({
            question_id: questionId,
            reaction,
            user_identifier: (analytics === null || analytics === void 0 ? void 0 : analytics.user().anonymousId()) || "",
        }));
    });
    return (react_1.default.createElement(AiAssistantContext.Provider, { value: {
            getAnswer,
            sendFeedback,
        } },
        children,
        react_1.default.createElement(components_1.AiAssistant, null),
        react_1.default.createElement(react_google_recaptcha_1.default, { ref: recaptchaRef, size: "invisible", sitekey: recaptchaSiteKey, onErrored: () => console.error("ReCAPTCHA token not yet configured. Please reach out to the kapa team at founders@kapa.ai to complete the setup."), className: "grecaptcha-badge" })));
};
exports.AiAssistantProvider = AiAssistantProvider;
const useAiAssistant = () => {
    const context = (0, react_1.useContext)(AiAssistantContext);
    if (!context) {
        throw new Error("useAiAssistant must be used within a AiAssistantProvider");
    }
    return context;
};
exports.useAiAssistant = useAiAssistant;
