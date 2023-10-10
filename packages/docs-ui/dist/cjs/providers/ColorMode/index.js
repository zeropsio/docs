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
exports.useColorMode = exports.ColorModeProvider = void 0;
const react_1 = __importStar(require("react"));
const ColorModeContext = (0, react_1.createContext)(null);
const ColorModeProvider = ({ children }) => {
    const [colorMode, setColorMode] = (0, react_1.useState)("light");
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const toggleColorMode = () => setColorMode(colorMode === "light" ? "dark" : "light");
    (0, react_1.useEffect)(() => {
        if (loaded) {
            return;
        }
        const theme = localStorage.getItem("theme");
        if (theme && (theme === "light" || theme === "dark")) {
            setColorMode(theme);
            setLoaded(true);
        }
    }, []);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.setAttribute("data-theme", colorMode);
    }, [colorMode]);
    (0, react_1.useEffect)(() => {
        if (!loaded) {
            return;
        }
        const theme = localStorage.getItem("theme");
        if (theme !== colorMode) {
            localStorage.setItem("theme", colorMode);
        }
    }, [loaded, colorMode]);
    return (react_1.default.createElement(ColorModeContext.Provider, { value: {
            colorMode,
            setColorMode,
            toggleColorMode,
        } }, children));
};
exports.ColorModeProvider = ColorModeProvider;
const useColorMode = () => {
    const context = (0, react_1.useContext)(ColorModeContext);
    if (!context) {
        throw new Error("useColorMode must be used inside a ColorModeProvider");
    }
    return context;
};
exports.useColorMode = useColorMode;
