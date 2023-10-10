import clsx from "clsx";
import React from "react";
export const Label = ({ children, className }) => {
    return (React.createElement("span", { className: clsx("text-medusa-fg-base text-compact-medium-plus", className) }, children));
};
