"use client";
import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Star, StarSolid } from "@medusajs/icons";
import { Button, Label, TextArea } from "../../components";
import { useNotifications } from "../../providers";
export const Rating = ({ event = "rating", className = "", onRating, additionalQuestion = "What should we improve?", parentNotificationId, }) => {
    const [rating, setRating] = useState(0);
    const [additionalFeedback, setAdditionalFeedback] = useState("");
    const [hoverRating, setHoverRating] = useState(0);
    const starElms = useRef([]);
    const starArr = Array.from(Array(5).keys());
    const { updateNotification } = useNotifications(true) || {};
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
    useEffect(() => {
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
    return (React.createElement("div", { className: clsx("flex flex-col gap-docs_1") },
        React.createElement("div", { className: clsx("flex gap-docs_0.5", className) }, starArr.map((i) => {
            const isSelected = (rating !== 0 && rating - 1 >= i) ||
                (hoverRating !== 0 && hoverRating - 1 >= i);
            return (React.createElement(Button, { variant: "clear", buttonRef: (element) => {
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
                !isSelected && React.createElement(Star, null),
                isSelected && (React.createElement(StarSolid, { className: "text-medusa-tag-orange-icon" }))));
        })),
        rating !== 0 && rating < 4 && (React.createElement("div", { className: clsx("text-medusa-fg-subtle", "flex flex-col gap-docs_0.5") },
            React.createElement(Label, null, additionalQuestion),
            React.createElement(TextArea, { placeholder: "I didn't like...", rows: 4, onChange: (e) => setAdditionalFeedback(e.target.value), value: additionalFeedback, className: "w-full" })))));
};
