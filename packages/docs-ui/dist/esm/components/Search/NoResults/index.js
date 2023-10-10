import { ExclamationCircleSolid } from "@medusajs/icons";
import clsx from "clsx";
import React from "react";
export const SearchNoResult = () => {
    return (React.createElement("div", { className: clsx("flex h-full w-full flex-col items-center justify-center gap-docs_1", "text-medusa-fg-muted") },
        React.createElement(ExclamationCircleSolid, null),
        React.createElement("span", { className: "text-compact-small" }, "No results found. Try changing selected filters.")));
};
