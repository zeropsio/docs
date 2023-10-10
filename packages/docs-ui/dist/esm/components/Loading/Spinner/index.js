import React from "react";
import clsx from "clsx";
import { Spinner } from "@medusajs/icons";
export const SpinnerLoading = ({ iconProps }) => {
    return (React.createElement("span", { role: "status" },
        React.createElement(Spinner, Object.assign({}, iconProps, { className: clsx("animate-spin", iconProps === null || iconProps === void 0 ? void 0 : iconProps.className) }))));
};
