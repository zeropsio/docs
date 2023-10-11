import React from "react";
import { Analytics } from "@segment/analytics-next";
export type ExtraData = {
    section?: string;
    [key: string]: any;
};
export type AnalyticsContextType = {
    loaded: boolean;
    analytics: Analytics | null;
    track: (event: string, options?: Record<string, any>, callback?: () => void) => void;
};
export type TrackedEvent = {
    event: string;
    options?: Record<string, any>;
};
export type AnalyticsProviderProps = {
    writeKey?: string;
    children?: React.ReactNode;
};
export declare const AnalyticsProvider: ({ writeKey, children, }: AnalyticsProviderProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map