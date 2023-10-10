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
import React, { createContext, useContext } from "react";
import { useAnalytics } from "../../providers";
import { AiAssistant } from "../../components";
import ReCAPTCHA from "react-google-recaptcha";
const AiAssistantContext = createContext(null);
export const AiAssistantProvider = ({ apiUrl, recaptchaSiteKey, websiteId, children, }) => {
    const { analytics } = useAnalytics();
    const recaptchaRef = React.createRef();
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
    return (React.createElement(AiAssistantContext.Provider, { value: {
            getAnswer,
            sendFeedback,
        } },
        children,
        React.createElement(AiAssistant, null),
        React.createElement(ReCAPTCHA, { ref: recaptchaRef, size: "invisible", sitekey: recaptchaSiteKey, onErrored: () => console.error("ReCAPTCHA token not yet configured. Please reach out to the kapa team at founders@kapa.ai to complete the setup."), className: "grecaptcha-badge" })));
};
export const useAiAssistant = () => {
    const context = useContext(AiAssistantContext);
    if (!context) {
        throw new Error("useAiAssistant must be used within a AiAssistantProvider");
    }
    return context;
};
