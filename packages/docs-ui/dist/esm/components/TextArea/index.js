import React from "react";
import clsx from "clsx";
export const TextArea = (props) => {
    return (React.createElement("textarea", Object.assign({}, props, { className: clsx("bg-medusa-bg-field shadow-button-secondary dark:shadow-button-secondary-dark", "border-medusa-border-base rounded-docs_sm border border-solid", "pt-docs_0.4 px-docs_0.75 text-medium font-base pb-[9px]", "hover:bg-medusa-bg-field-hover", "focus:border-medusa-border-interactive", "active:border-medusa-border-interactive", "disabled:bg-medusa-bg-disabled", "disabled:border-medusa-border-base", "placeholder:text-medusa-fg-muted", "disabled:placeholder:text-medusa-fg-disabled", props.className) })));
};
