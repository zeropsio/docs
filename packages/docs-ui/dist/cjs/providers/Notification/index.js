"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotifications = exports.NotificationProvider = exports.NotificationReducerActionTypes = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const react_uuid_1 = __importDefault(require("react-uuid"));
var NotificationReducerActionTypes;
(function (NotificationReducerActionTypes) {
    NotificationReducerActionTypes["ADD"] = "add";
    NotificationReducerActionTypes["REMOVE"] = "remove";
    NotificationReducerActionTypes["UPDATE"] = "update";
})(NotificationReducerActionTypes || (exports.NotificationReducerActionTypes = NotificationReducerActionTypes = {}));
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
const NotificationContext = (0, react_1.createContext)(null);
const NotificationProvider = ({ children, }) => {
    const [notifications, dispatch] = (0, react_1.useReducer)(notificationReducer, []);
    const generateId = () => (0, react_uuid_1.default)();
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
    return (react_1.default.createElement(NotificationContext.Provider, { value: {
            notifications,
            addNotification,
            generateId,
            removeNotification,
            updateNotification,
        } },
        children,
        react_1.default.createElement(components_1.NotificationContainer, null)));
};
exports.NotificationProvider = NotificationProvider;
const useNotifications = (suppressError) => {
    const context = (0, react_1.useContext)(NotificationContext);
    if (!context && !suppressError) {
        throw new Error("useNotifications must be used within a NotificationProvider");
    }
    return context;
};
exports.useNotifications = useNotifications;
