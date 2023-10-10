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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = void 0;
const react_1 = __importStar(require("react"));
const react_transition_group_1 = require("react-transition-group");
const Solutions_1 = require("./Solutions");
const Analytics_1 = require("../../providers/Analytics");
const clsx_1 = __importDefault(require("clsx"));
const TextArea_1 = require("../../components/TextArea");
const Label_1 = require("../../components/Label");
const docs_ui_1 = require("../../index.js");
const Details_1 = require("../../components/Details");
const Text_1 = require("../../components/Input/Text");
const Feedback = ({ event, pathName, reportLink, question = "Was this section helpful?", positiveBtn = "Yes", negativeBtn = "No", positiveQuestion = "What was most helpful?", negativeQuestion = "What can we improve?", submitBtn = "Submit", submitMessage = "Thank you for helping improve our documentation!", showPossibleSolutions = true, className = "", extraData = {}, vertical = false, showLongForm = false, }) => {
    const [showForm, setShowForm] = (0, react_1.useState)(false);
    const [submittedFeedback, setSubmittedFeedback] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const inlineFeedbackRef = (0, react_1.useRef)(null);
    const inlineQuestionRef = (0, react_1.useRef)(null);
    const inlineMessageRef = (0, react_1.useRef)(null);
    const [positiveFeedback, setPositiveFeedback] = (0, react_1.useState)(false);
    const [message, setMessage] = (0, react_1.useState)("");
    const [steps, setSteps] = (0, react_1.useState)("");
    const [medusaVersion, setMedusaVersion] = (0, react_1.useState)("");
    const [errorFix, setErrorFix] = (0, react_1.useState)("");
    const [contactInfo, setContactInfo] = (0, react_1.useState)("");
    const nodeRef = submittedFeedback
        ? inlineMessageRef
        : showForm
            ? inlineQuestionRef
            : inlineFeedbackRef;
    const { loaded, track } = (0, Analytics_1.useAnalytics)();
    function handleFeedback(e) {
        if (!loaded) {
            return;
        }
        const feedback = e.target.classList.contains("positive");
        setPositiveFeedback(feedback);
        setShowForm(true);
        submitFeedback(e, feedback);
    }
    function submitFeedback(e, feedback = false) {
        if (showForm) {
            setLoading(true);
        }
        track(event, Object.assign({ url: pathName, label: document.title, feedback: (feedback !== null && feedback) ||
                (feedback === null && positiveFeedback)
                ? "yes"
                : "no", message: (message === null || message === void 0 ? void 0 : message.length) ? message : null, os: window.navigator.userAgent, steps,
            medusaVersion,
            errorFix,
            contactInfo }, extraData), function () {
            if (showForm) {
                setLoading(false);
                resetForm();
            }
        });
    }
    function resetForm() {
        setShowForm(false);
        setSubmittedFeedback(true);
    }
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("mt-docs_3", className) },
        react_1.default.createElement(react_transition_group_1.SwitchTransition, { mode: "out-in" },
            react_1.default.createElement(react_transition_group_1.CSSTransition, { key: showForm
                    ? "show_form"
                    : !submittedFeedback
                        ? "feedback"
                        : "submitted_feedback", nodeRef: nodeRef, timeout: 300, addEndListener: (done) => {
                    var _a;
                    (_a = nodeRef.current) === null || _a === void 0 ? void 0 : _a.addEventListener("transitionend", done, false);
                }, classNames: {
                    enter: "animate-fadeIn animation-fill-forwards animate-fast",
                    exit: "animate-fadeOut animation-fill-forwards animate-fast",
                } },
                react_1.default.createElement(react_1.default.Fragment, null,
                    !showForm && !submittedFeedback && (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex", !vertical && "flex-row items-center", vertical && "flex-col justify-center gap-docs_1"), ref: inlineFeedbackRef },
                        react_1.default.createElement(Label_1.Label, { className: "mr-docs_1.5" }, question),
                        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-row items-center gap-docs_0.5") },
                            react_1.default.createElement(docs_ui_1.Button, { onClick: handleFeedback, className: "positive w-fit", variant: "secondary" }, positiveBtn),
                            react_1.default.createElement(docs_ui_1.Button, { onClick: handleFeedback, className: "w-fit", variant: "secondary" }, negativeBtn),
                            reportLink && (react_1.default.createElement(docs_ui_1.Button, { variant: "secondary" },
                                react_1.default.createElement("a", { href: reportLink }, "Report Issue")))))),
                    showForm && !submittedFeedback && (react_1.default.createElement("div", { className: "flex flex-col gap-docs_1", ref: inlineQuestionRef },
                        react_1.default.createElement(Label_1.Label, null, positiveFeedback ? positiveQuestion : negativeQuestion),
                        react_1.default.createElement(TextArea_1.TextArea, { rows: 4, value: message, onChange: (e) => setMessage(e.target.value) }),
                        showLongForm && !positiveFeedback && (react_1.default.createElement(Details_1.Details, { summaryContent: "More Details", className: "mt-docs_1" },
                            react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    react_1.default.createElement(Label_1.Label, null, "Can you provide the exact steps you took before receiving the error? For example, the commands you ran."),
                                    react_1.default.createElement(TextArea_1.TextArea, { rows: 4, value: steps, onChange: (e) => setSteps(e.target.value), placeholder: "1. I ran npm dev..." })),
                                react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    react_1.default.createElement(Label_1.Label, null, "If applicable, what version of Medusa are you using? If a plugin is related to the error, please provide a version of that as well."),
                                    react_1.default.createElement(TextArea_1.TextArea, { rows: 4, value: medusaVersion, onChange: (e) => setMedusaVersion(e.target.value), placeholder: "@medusajs/medusa: vX" })),
                                react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    react_1.default.createElement(Label_1.Label, null, "Were you able to fix the error? If so, what steps did you follow?"),
                                    react_1.default.createElement(TextArea_1.TextArea, { rows: 4, value: errorFix, onChange: (e) => setErrorFix(e.target.value), placeholder: "@medusajs/medusa: vX" })),
                                react_1.default.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    react_1.default.createElement(Label_1.Label, null, "Can you provide your email or discord username? This would allow us to contact you for further info or assist you with your issue."),
                                    react_1.default.createElement(Text_1.InputText, { value: contactInfo, onChange: (e) => setContactInfo(e.target.value), placeholder: "user@example.com" }))))),
                        react_1.default.createElement(docs_ui_1.Button, { onClick: submitFeedback, disabled: loading, className: "w-fit", variant: "secondary" }, submitBtn))),
                    submittedFeedback && (react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: "text-compact-large-plus flex flex-col", ref: inlineMessageRef },
                            react_1.default.createElement("span", null, submitMessage),
                            showPossibleSolutions && (react_1.default.createElement(Solutions_1.Solutions, { message: message, feedback: positiveFeedback }))))))))));
};
exports.Feedback = Feedback;
