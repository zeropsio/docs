import React from "react";
import { ArrowUpRightOnBox } from "@medusajs/icons";
import clsx from "clsx";
import { LegacyLink } from "../../components";
export const Card = ({ startIcon, endIcon, title, text, href, className, contentClassName, children, showLinkIcon = true, }) => {
    return (React.createElement("div", { className: clsx("bg-medusa-bg-subtle w-full rounded", "shadow-card-rest dark:shadow-card-rest-dark py-docs_0.75 relative px-docs_1", "flex items-start gap-docs_1 transition-shadow", href && "hover:shadow-card-hover dark:hover:shadow-card-hover-dark", className) },
        startIcon,
        React.createElement("div", { className: "flex items-start gap-docs_1 justify-between flex-1" },
            React.createElement("div", { className: clsx("flex flex-col", contentClassName) },
                title && (React.createElement("span", { className: "text-compact-medium-plus text-medusa-fg-base" }, title)),
                text && (React.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle" }, text)),
                children),
            href && (React.createElement(React.Fragment, null,
                showLinkIcon && (React.createElement(ArrowUpRightOnBox, { className: "text-medusa-fg-subtle min-w-[20px]" })),
                React.createElement(LegacyLink, { href: href, className: "absolute left-0 top-0 h-full w-full rounded" })))),
        endIcon));
};
