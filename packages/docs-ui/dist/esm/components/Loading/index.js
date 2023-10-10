import React from "react";
import clsx from "clsx";
export const Loading = ({ className, count = 6, barClassName, }) => {
    const getLoadingBars = () => {
        const bars = [];
        for (let i = 0; i < count; i++) {
            bars.push(React.createElement("span", { className: clsx("bg-medusa-bg-subtle-pressed h-docs_1 w-full rounded-full", barClassName), key: i }));
        }
        return bars;
    };
    return (React.createElement("span", { role: "status", className: clsx("my-docs_1 flex w-full animate-pulse flex-col gap-docs_1", className) },
        getLoadingBars(),
        React.createElement("span", { className: "sr-only" }, "Loading...")));
};
