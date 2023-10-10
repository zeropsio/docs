import clsx from "clsx";
import React from "react";
export const DotsLoading = ({ className }) => {
    return (React.createElement("span", { className: clsx("text-medium text-medusa-fg-subtle", className) },
        React.createElement("span", { className: "animate-pulsingDots" }, "."),
        React.createElement("span", { className: "animate-pulsingDots animation-delay-[500ms]" }, "."),
        React.createElement("span", { className: "animate-pulsingDots animation-delay-[1000ms]" }, ".")));
};
