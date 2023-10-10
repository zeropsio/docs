"use client";
import React, { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Solutions } from "./Solutions";
import { useAnalytics } from "../../providers/Analytics";
import clsx from "clsx";
import { TextArea } from "../../components/TextArea";
import { Label } from "../../components/Label";
import { Button } from "../../index.js";
import { Details } from "../../components/Details";
import { InputText } from "../../components/Input/Text";
export const Feedback = ({ event, pathName, reportLink, question = "Was this section helpful?", positiveBtn = "Yes", negativeBtn = "No", positiveQuestion = "What was most helpful?", negativeQuestion = "What can we improve?", submitBtn = "Submit", submitMessage = "Thank you for helping improve our documentation!", showPossibleSolutions = true, className = "", extraData = {}, vertical = false, showLongForm = false, }) => {
    const [showForm, setShowForm] = useState(false);
    const [submittedFeedback, setSubmittedFeedback] = useState(false);
    const [loading, setLoading] = useState(false);
    const inlineFeedbackRef = useRef(null);
    const inlineQuestionRef = useRef(null);
    const inlineMessageRef = useRef(null);
    const [positiveFeedback, setPositiveFeedback] = useState(false);
    const [message, setMessage] = useState("");
    const [steps, setSteps] = useState("");
    const [medusaVersion, setMedusaVersion] = useState("");
    const [errorFix, setErrorFix] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const nodeRef = submittedFeedback
        ? inlineMessageRef
        : showForm
            ? inlineQuestionRef
            : inlineFeedbackRef;
    const { loaded, track } = useAnalytics();
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
    return (React.createElement("div", { className: clsx("mt-docs_3", className) },
        React.createElement(SwitchTransition, { mode: "out-in" },
            React.createElement(CSSTransition, { key: showForm
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
                React.createElement(React.Fragment, null,
                    !showForm && !submittedFeedback && (React.createElement("div", { className: clsx("flex", !vertical && "flex-row items-center", vertical && "flex-col justify-center gap-docs_1"), ref: inlineFeedbackRef },
                        React.createElement(Label, { className: "mr-docs_1.5" }, question),
                        React.createElement("div", { className: clsx("flex flex-row items-center gap-docs_0.5") },
                            React.createElement(Button, { onClick: handleFeedback, className: "positive w-fit", variant: "secondary" }, positiveBtn),
                            React.createElement(Button, { onClick: handleFeedback, className: "w-fit", variant: "secondary" }, negativeBtn),
                            reportLink && (React.createElement(Button, { variant: "secondary" },
                                React.createElement("a", { href: reportLink }, "Report Issue")))))),
                    showForm && !submittedFeedback && (React.createElement("div", { className: "flex flex-col gap-docs_1", ref: inlineQuestionRef },
                        React.createElement(Label, null, positiveFeedback ? positiveQuestion : negativeQuestion),
                        React.createElement(TextArea, { rows: 4, value: message, onChange: (e) => setMessage(e.target.value) }),
                        showLongForm && !positiveFeedback && (React.createElement(Details, { summaryContent: "More Details", className: "mt-docs_1" },
                            React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    React.createElement(Label, null, "Can you provide the exact steps you took before receiving the error? For example, the commands you ran."),
                                    React.createElement(TextArea, { rows: 4, value: steps, onChange: (e) => setSteps(e.target.value), placeholder: "1. I ran npm dev..." })),
                                React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    React.createElement(Label, null, "If applicable, what version of Medusa are you using? If a plugin is related to the error, please provide a version of that as well."),
                                    React.createElement(TextArea, { rows: 4, value: medusaVersion, onChange: (e) => setMedusaVersion(e.target.value), placeholder: "@medusajs/medusa: vX" })),
                                React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    React.createElement(Label, null, "Were you able to fix the error? If so, what steps did you follow?"),
                                    React.createElement(TextArea, { rows: 4, value: errorFix, onChange: (e) => setErrorFix(e.target.value), placeholder: "@medusajs/medusa: vX" })),
                                React.createElement("div", { className: "flex flex-col gap-docs_0.5" },
                                    React.createElement(Label, null, "Can you provide your email or discord username? This would allow us to contact you for further info or assist you with your issue."),
                                    React.createElement(InputText, { value: contactInfo, onChange: (e) => setContactInfo(e.target.value), placeholder: "user@example.com" }))))),
                        React.createElement(Button, { onClick: submitFeedback, disabled: loading, className: "w-fit", variant: "secondary" }, submitBtn))),
                    submittedFeedback && (React.createElement("div", null,
                        React.createElement("div", { className: "text-compact-large-plus flex flex-col", ref: inlineMessageRef },
                            React.createElement("span", null, submitMessage),
                            showPossibleSolutions && (React.createElement(Solutions, { message: message, feedback: positiveFeedback }))))))))));
};
