import clsx from "clsx";
import React from "react";
export const Bordered = ({ wrapperClassName, children }) => {
    return (React.createElement("span", { className: clsx("border-medusa-border-strong bg-docs-bg", "dark:bg-docs-bg-dark mr-docs_1 inline-flex w-fit items-center justify-center rounded-docs_DEFAULT border border-solid p-[3px]", "no-zoom-img", wrapperClassName) }, children));
};
