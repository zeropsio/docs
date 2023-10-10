import React from "react";
import clsx from "clsx";
import { Button } from "../../../components";
export const ModalFooter = ({ actions, children, className, }) => {
    return (React.createElement("div", { className: clsx("py-docs_1.5 pl-0 pr-docs_2", "border-medusa-border-base border-0 border-t border-solid", "flex justify-end gap-docs_0.5", className) }, actions === null || actions === void 0 ? void 0 :
        actions.map((action, index) => (React.createElement(Button, Object.assign({}, action, { key: index })))),
        children));
};
