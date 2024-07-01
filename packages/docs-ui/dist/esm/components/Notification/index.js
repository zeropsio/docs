import { useNotifications, } from "../../providers";
import React from "react";
import { NotificationItem } from "./Item";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";
export const NotificationContainer = () => {
    const { notifications, removeNotification } = useNotifications();
    const handleClose = (notification) => {
        var _a;
        (_a = notification.onClose) === null || _a === void 0 ? void 0 : _a.call(notification);
        if (notification.id) {
            removeNotification(notification.id);
        }
    };
    const renderFilteredNotifications = (condition, className) => {
        return (React.createElement(TransitionGroup, { className: clsx("flex fixed flex-col gap-docs_0.5 right-0", "md:w-auto w-full overflow-y-auto", "max-h-[50%] md:max-h-[calc(100vh-57px)]", notifications.length && "max-[768px]:h-[50%]", className) }, notifications.filter(condition).map((notification) => (React.createElement(CSSTransition, { key: notification.id, timeout: 200, classNames: {
                enter: "animate-slideInRight animate-fast",
                exit: "animate-slideOutRight animate-fast",
            } },
            React.createElement(NotificationItem, Object.assign({}, notification, { onClose: () => handleClose(notification), className: clsx(notification.className, "!relative !top-0 !bottom-0 !right-0") })))))));
    };
    return (React.createElement(React.Fragment, null,
        renderFilteredNotifications((notification) => notification.placement === "top", "top-0"),
        renderFilteredNotifications((notification) => notification.placement !== "top", "bottom-0")));
};
