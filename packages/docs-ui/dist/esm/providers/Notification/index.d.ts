import React from "react";
import { NotificationItemProps } from "../../components";
export type NotificationItemType = {
    id?: string;
} & NotificationItemProps;
export type NotificationContextType = {
    notifications: NotificationItemType[];
    addNotification: (value: NotificationItemType) => void;
    generateId: () => string;
    removeNotification: (id: string) => void;
    updateNotification: (id: string, updatedData: Partial<Omit<NotificationItemType, "id">>) => void;
};
export declare enum NotificationReducerActionTypes {
    ADD = "add",
    REMOVE = "remove",
    UPDATE = "update"
}
export type NotificationReducerAction = {
    type: NotificationReducerActionTypes.ADD;
    notification: NotificationItemType;
} | {
    type: NotificationReducerActionTypes.REMOVE;
    id: string;
} | {
    type: NotificationReducerActionTypes.UPDATE;
    id: string;
    updatedData: Partial<Omit<NotificationItemType, "id">>;
};
export type NotificationProviderProps = {
    children?: React.ReactNode;
};
export declare const NotificationProvider: ({ children, }: NotificationProviderProps) => React.JSX.Element;
export declare const useNotifications: (suppressError?: boolean) => NotificationContextType | null;
//# sourceMappingURL=index.d.ts.map