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
exports.Details = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const clsx_1 = __importDefault(require("clsx"));
const react_transition_group_1 = require("react-transition-group");
const Summary_1 = require("./Summary");
const Details = (_a) => {
    var { openInitial = false, summaryContent, summaryElm, children, heightAnimation = false } = _a, props = __rest(_a, ["openInitial", "summaryContent", "summaryElm", "children", "heightAnimation"]);
    const [open, setOpen] = (0, react_1.useState)(openInitial);
    const [showContent, setShowContent] = (0, react_1.useState)(openInitial);
    const ref = (0, react_1.useRef)(null);
    const handleToggle = (e) => {
        const targetElm = e.target;
        if (targetElm.tagName.toLowerCase() === "a") {
            window.location.href =
                targetElm.getAttribute("href") || window.location.href;
            return;
        }
        if (targetElm.tagName.toLowerCase() === "code") {
            return;
        }
        if (open) {
            setShowContent(false);
        }
        else {
            setOpen(true);
            setShowContent(true);
        }
    };
    return (react_1.default.createElement("details", Object.assign({}, props, { ref: ref, open: open, onClick: (event) => {
            event.preventDefault();
        }, onToggle: (event) => {
            // this is to avoid event propagation
            // when details are nested, which is a bug
            // in react. Learn more here:
            // https://github.com/facebook/react/issues/22718
            event.stopPropagation();
        }, className: (0, clsx_1.default)("border-medusa-border-base border-y border-solid border-x-0", "overflow-hidden [&>summary]:relative", props.className) }),
        summaryContent && (react_1.default.createElement(Summary_1.DetailsSummary, { open: open, onClick: handleToggle, className: "cursor-pointer", title: summaryContent })),
        summaryElm &&
            (0, react_1.cloneElement)(summaryElm, {
                open,
                onClick: handleToggle,
            }),
        react_1.default.createElement(react_transition_group_1.CSSTransition, { unmountOnExit: true, in: showContent, timeout: 150, onEnter: (node) => {
                if (heightAnimation) {
                    node.classList.add("transition-[height]");
                    node.style.height = `0px`;
                }
                else {
                    node.classList.add("!mb-docs_2", "!mt-0", "translate-y-docs_1", "transition-transform");
                }
            }, onEntering: (node) => {
                if (heightAnimation) {
                    node.style.height = `${node.scrollHeight}px`;
                }
            }, onEntered: (node) => {
                if (heightAnimation) {
                    node.style.height = `auto`;
                }
            }, onExit: (node) => {
                if (heightAnimation) {
                    node.style.height = `${node.scrollHeight}px`;
                }
                else {
                    node.classList.add("transition-transform", "!-translate-y-docs_1");
                    setTimeout(() => {
                        setOpen(false);
                    }, 100);
                }
            }, onExiting: (node) => {
                if (heightAnimation) {
                    node.style.height = `0px`;
                    setTimeout(() => {
                        setOpen(false);
                    }, 100);
                }
            } },
            react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(components_1.Loading, { className: "!mb-docs_2 !mt-0" }) }, children))));
};
exports.Details = Details;
