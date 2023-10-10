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
exports.useNavbar = exports.NavbarProvider = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const NavbarContext = (0, react_1.createContext)(null);
const NavbarProvider = ({ children, basePath = "", }) => {
    const [activeItem, setActiveItem] = (0, react_1.useState)(null);
    const pathname = (0, navigation_1.usePathname)();
    const assemblePathName = (path) => `${basePath}/${path.charAt(0) === "/" ? path.substring(1) : path}`;
    (0, react_1.useEffect)(() => {
        const newPath = assemblePathName(pathname);
        if (activeItem !== newPath) {
            setActiveItem(newPath);
        }
    }, [pathname, activeItem]);
    return (react_1.default.createElement(NavbarContext.Provider, { value: {
            activeItem,
            setActiveItem,
        } }, children));
};
exports.NavbarProvider = NavbarProvider;
const useNavbar = () => {
    const context = (0, react_1.useContext)(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used inside a NavbarProvider");
    }
    return context;
};
exports.useNavbar = useNavbar;
