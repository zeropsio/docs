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
exports.Rating = void 0;
const react_1 = __importStar(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const icons_1 = require("@medusajs/icons");
const components_1 = require("../../components");
const providers_1 = require("../../providers");
const Rating = ({ event = "rating", className = "", onRating, additionalQuestion = "What should we improve?", parentNotificationId, }) => {
    const [rating, setRating] = (0, react_1.useState)(0);
    const [additionalFeedback, setAdditionalFeedback] = (0, react_1.useState)("");
    const [hoverRating, setHoverRating] = (0, react_1.useState)(0);
    const starElms = (0, react_1.useRef)([]);
    const starArr = Array.from(Array(5).keys());
    const { updateNotification } = (0, providers_1.useNotifications)(true) || {};
    const handleRating = (selectedRating) => {
        if (rating) {
            return;
        }
        setHoverRating(0);
        setRating(selectedRating);
        if (selectedRating >= 4) {
            for (let i = 0; i < selectedRating; i++) {
                starElms.current[i].classList.add("animate-tada");
            }
        }
    };
    (0, react_1.useEffect)(() => {
        if (rating > 0 &&
            rating < 4 &&
            parentNotificationId &&
            updateNotification) {
            // update parent notification ID
            updateNotification(parentNotificationId, {
                closeButtonText: "Submit",
                onClose: () => undefined,
            });
        }
    }, [additionalFeedback, rating]);
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)("flex flex-col gap-docs_1") },
        react_1.default.createElement("div", { className: (0, clsx_1.default)("flex gap-docs_0.5", className) }, starArr.map((i) => {
            const isSelected = (rating !== 0 && rating - 1 >= i) ||
                (hoverRating !== 0 && hoverRating - 1 >= i);
            return (react_1.default.createElement(components_1.Button, { variant: "clear", buttonRef: (element) => {
                    if (starElms.current.length - 1 < i) {
                        starElms.current.push(element);
                    }
                }, key: i, onMouseOver: () => {
                    if (!rating) {
                        setHoverRating(i + 1);
                    }
                }, onMouseLeave: () => {
                    if (!rating) {
                        setHoverRating(0);
                    }
                }, onClick: () => handleRating(i + 1) },
                !isSelected && react_1.default.createElement(icons_1.Star, null),
                isSelected && (react_1.default.createElement(icons_1.StarSolid, { className: "text-medusa-tag-orange-icon" }))));
        })),
        rating !== 0 && rating < 4 && (react_1.default.createElement("div", { className: (0, clsx_1.default)("text-medusa-fg-subtle", "flex flex-col gap-docs_0.5") },
            react_1.default.createElement(components_1.Label, null, additionalQuestion),
            react_1.default.createElement(components_1.TextArea, { placeholder: "I didn't like...", rows: 4, onChange: (e) => setAdditionalFeedback(e.target.value), value: additionalFeedback, className: "w-full" })))));
};
exports.Rating = Rating;
