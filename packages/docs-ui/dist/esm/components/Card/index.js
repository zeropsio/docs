import React from "react";
import { ArrowUpRightOnBox } from "@medusajs/icons";
import clsx from "clsx";
import { Link } from "../../components";
export const Card = ({ icon, title, text, href, className }) => {
    return (React.createElement("div", { className: clsx("bg-medusa-bg-subtle w-full rounded", "shadow-card-rest dark:shadow-card-rest-dark py-docs_0.75 relative px-docs_1", "flex items-center gap-docs_1 transition-shadow", href && "hover:shadow-card-hover dark:hover:shadow-card-hover-dark", className) },
        icon,
        React.createElement("div", { className: "flex items-center gap-docs_1 justify-between flex-1" },
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("span", { className: "text-compact-medium-plus text-medusa-fg-base" }, title),
                text && (React.createElement("span", { className: "text-compact-medium text-medusa-fg-subtle" }, text))),
            href && (React.createElement(React.Fragment, null,
                React.createElement(ArrowUpRightOnBox, { className: "text-medusa-fg-subtle" }),
                React.createElement(Link, { href: href, className: "absolute left-0 top-0 h-full w-full rounded" }))))));
};
