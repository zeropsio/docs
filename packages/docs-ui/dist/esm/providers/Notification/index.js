"use client";
import React, { createContext, useContext, useReducer } from "react";
import { NotificationContainer } from "../../components";
import uuid from "react-uuid";
export var NotificationReducerActionTypes;
(function (NotificationReducerActionTypes) {
    NotificationReducerActionTypes["ADD"] = "add";
    NotificationReducerActionTypes["REMOVE"] = "remove";
    NotificationReducerActionTypes["UPDATE"] = "update";
})(NotificationReducerActionTypes || (NotificationReducerActionTypes = {}));
const notificationReducer = (state, action) => {
    switch (action.type) {
        case NotificationReducerActionTypes.ADD:
            return [...state, action.notification];
        case NotificationReducerActionTypes.REMOVE:
            return state.filter((notification) => notification.id !== action.id);
        case NotificationReducerActionTypes.UPDATE:
            return state.map((notification) => {
                if (notification.id === action.id) {
                    return Object.assign(Object.assign({}, notification), action.updatedData);
                }
                return notification;
            });
        default:
            return state;
    }
};
const NotificationContext = createContext(null);
export const NotificationProvider = ({ children, }) => {
    const [notifications, dispatch] = useReducer(notificationReducer, []);
    const generateId = () => uuid();
    const addNotification = (notification) => {
        if (!notification.id) {
            notification.id = generateId();
        }
        dispatch({
            type: NotificationReducerActionTypes.ADD,
            notification,
        });
    };
    const updateNotification = (id, updatedData) => {
        dispatch({
            type: NotificationReducerActionTypes.UPDATE,
            id,
            updatedData,
        });
    };
    const removeNotification = (id) => {
        dispatch({
            type: NotificationReducerActionTypes.REMOVE,
            id,
        });
    };
    return (React.createElement(NotificationContext.Provider, { value: {
            notifications,
            addNotification,
            generateId,
            removeNotification,
            updateNotification,
        } },
        children,
        React.createElement(NotificationContainer, null)));
};
export const useNotifications = (suppressError) => {
    const context = useContext(NotificationContext);
    if (!context && !suppressError) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};
