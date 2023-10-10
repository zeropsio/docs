import React from "react";
import clsx from "clsx";
import { useModal } from "../../../providers";
import { Button } from "../../../components";
import { XMark } from "@medusajs/icons";
export const ModalHeader = ({ title }) => {
    const { closeModal } = useModal();
    return (React.createElement("div", { className: clsx("border-medusa-border-base border-0 border-b border-solid py-docs_1.5 px-docs_2", "flex items-center justify-between") },
        React.createElement("span", { className: clsx("text-medusa-fg-base text-h2") }, title),
        React.createElement(Button, { variant: "clear", className: "cursor-pointer", onClick: () => closeModal() },
            React.createElement(XMark, null))));
};
