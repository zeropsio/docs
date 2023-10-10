"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { AnalyticsBrowser } from "@segment/analytics-next";
const AnalyticsContext = createContext(null);
const LOCAL_STORAGE_KEY = "ajs_anonymous_id";
export const AnalyticsProvider = ({ writeKey = "temp", children, }) => {
    // loaded is used to ensure that a connection has been made to segment
    // even if it failed. This is to ensure that the connection isn't
    // continuously retried
    const [loaded, setLoaded] = useState(false);
    const [analytics, setAnalytics] = useState(null);
    const analyticsBrowser = new AnalyticsBrowser();
    const [queue, setQueue] = useState([]);
    const init = useCallback(() => {
        if (!loaded) {
            analyticsBrowser
                .load({ writeKey }, {
                initialPageview: true,
                user: {
                    localStorage: {
                        key: LOCAL_STORAGE_KEY,
                    },
                },
            })
                .then((instance) => {
                setAnalytics(instance[0]);
            })
                .catch((e) => console.error(`Could not connect to Segment. Error: ${e}`))
                .finally(() => setLoaded(true));
        }
    }, [loaded, writeKey]);
    const track = useCallback((event, options, callback) => __awaiter(void 0, void 0, void 0, function* () {
        if (analytics) {
            void analytics.track(event, Object.assign(Object.assign({}, options), { uuid: analytics.user().anonymousId() }), callback);
        }
        else {
            // push the event into the queue
            setQueue((prevQueue) => [
                ...prevQueue,
                {
                    event,
                    options,
                },
            ]);
            if (callback) {
                console.warn("Segment is either not installed or not configured. Simulating success...");
                callback();
            }
        }
    }), [analytics, loaded]);
    useEffect(() => {
        init();
    }, [init]);
    useEffect(() => {
        if (analytics && queue.length) {
            // track stuff in queue
            queue.forEach((trackEvent) => __awaiter(void 0, void 0, void 0, function* () { return track(trackEvent.event, trackEvent.options); }));
            setQueue([]);
        }
    }, [analytics, queue]);
    return (React.createElement(AnalyticsContext.Provider, { value: {
            analytics,
            track,
            loaded,
        } }, children));
};
export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error("useAnalytics must be used within a AnalyticsProvider");
    }
    return context;
};
