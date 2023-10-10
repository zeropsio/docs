"use client";
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
import React, { Suspense, cloneElement, useRef, useState } from "react";
import { Loading } from "../../components/Loading";
import clsx from "clsx";
import { CSSTransition } from "react-transition-group";
import { DetailsSummary } from "./Summary";
export const Details = (_a) => {
    var { openInitial = false, summaryContent, summaryElm, children } = _a, props = __rest(_a, ["openInitial", "summaryContent", "summaryElm", "children"]);
    const [open, setOpen] = useState(openInitial);
    const [showContent, setShowContent] = useState(openInitial);
    const ref = useRef(null);
    const handleToggle = () => {
        if (open) {
            setShowContent(false);
        }
        else {
            setOpen(true);
            setShowContent(true);
        }
    };
    return (React.createElement("details", Object.assign({}, props, { ref: ref, open: open, onClick: (event) => {
            event.preventDefault();
        }, onToggle: (event) => {
            // this is to avoid event propagation
            // when details are nested, which is a bug
            // in react. Learn more here:
            // https://github.com/facebook/react/issues/22718
            event.stopPropagation();
        }, className: clsx("border-medusa-border-base border-y border-solid border-x-0", "overflow-hidden [&>summary]:relative", props.className) }),
        summaryContent && (React.createElement(DetailsSummary, { onClick: handleToggle, className: "cursor-pointer", title: summaryContent })),
        summaryElm &&
            cloneElement(summaryElm, {
                open,
                onClick: handleToggle,
            }),
        React.createElement(CSSTransition, { unmountOnExit: true, in: showContent, timeout: 150, onEnter: (node) => {
                node.classList.add("!mb-docs_2", "!mt-0", "translate-y-docs_1", "transition-transform");
            }, onExit: (node) => {
                node.classList.add("transition-transform", "!-translate-y-docs_1");
                setTimeout(() => {
                    setOpen(false);
                }, 100);
            } },
            React.createElement(Suspense, { fallback: React.createElement(Loading, { className: "!mb-docs_2 !mt-0" }) }, children))));
};
