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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsProvider = void 0;
const react_1 = __importStar(require("react"));
const analytics_next_1 = require("@segment/analytics-next");
const AnalyticsContext = (0, react_1.createContext)(null);
const LOCAL_STORAGE_KEY = "ajs_anonymous_id";
const AnalyticsProvider = ({ writeKey = "temp", children, }) => {
    // loaded is used to ensure that a connection has been made to segment
    // even if it failed. This is to ensure that the connection isn't
    // continuously retried
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [analytics, setAnalytics] = (0, react_1.useState)(null);
    const analyticsBrowser = new analytics_next_1.AnalyticsBrowser();
    const [queue, setQueue] = (0, react_1.useState)([]);
    const init = (0, react_1.useCallback)(() => {
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
    const track = (0, react_1.useCallback)((event, options, callback) => __awaiter(void 0, void 0, void 0, function* () {
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
    (0, react_1.useEffect)(() => {
        init();
    }, [init]);
    (0, react_1.useEffect)(() => {
        if (analytics && queue.length) {
            // track stuff in queue
            queue.forEach((trackEvent) => __awaiter(void 0, void 0, void 0, function* () { return track(trackEvent.event, trackEvent.options); }));
            setQueue([]);
        }
    }, [analytics, queue]);
    return (react_1.default.createElement(AnalyticsContext.Provider, { value: {
            analytics,
            track,
            loaded,
        } }, children));
};
exports.AnalyticsProvider = AnalyticsProvider;
