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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobile = exports.MobileProvider = void 0;
const react_1 = __importStar(require("react"));
const MobileContext = (0, react_1.createContext)(null);
const MobileProvider = ({ children }) => {
    const [isMobile, setIsMobile] = (0, react_1.useState)(false);
    const handleResize = (0, react_1.useCallback)(() => {
        if (window.innerWidth < 1025 && !isMobile) {
            setIsMobile(true);
        }
        else if (window.innerWidth >= 1025 && isMobile) {
            setIsMobile(false);
        }
    }, [isMobile]);
    (0, react_1.useEffect)(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);
    (0, react_1.useEffect)(() => {
        handleResize();
    }, []);
    return (react_1.default.createElement(MobileContext.Provider, { value: {
            isMobile,
        } }, children));
};
exports.MobileProvider = MobileProvider;
const useMobile = () => {
    const context = (0, react_1.useContext)(MobileContext);
    if (!context) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
};
exports.useMobile = useMobile;
