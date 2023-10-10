import React from "react";
import { Bordered } from "../../components/Bordered";
import clsx from "clsx";
export const BorderedIcon = ({ icon = "", IconComponent = null, wrapperClassName, iconWrapperClassName, iconClassName, iconColorClassName = "", }) => {
    return (React.createElement(Bordered, { wrapperClassName: wrapperClassName },
        React.createElement("span", { className: clsx("rounded-docs_xs p-docs_0.125 bg-medusa-bg-component inline-flex items-center justify-center", iconWrapperClassName) },
            !IconComponent && (React.createElement("img", { src: icon || "", className: clsx(iconClassName, "bordered-icon"), alt: "" })),
            IconComponent && (React.createElement(IconComponent, { className: clsx("text-medusa-fg-subtle", iconClassName, "bordered-icon", iconColorClassName) })))));
};
