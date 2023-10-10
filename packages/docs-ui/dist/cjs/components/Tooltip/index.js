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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const react_1 = __importStar(require("react"));
const react_tooltip_1 = require("react-tooltip");
const clsx_1 = __importDefault(require("clsx"));
require("react-tooltip/dist/react-tooltip.css");
const react_uuid_1 = __importDefault(require("react-uuid"));
const Tooltip = (_a) => {
    var { text = "", tooltipClassName = "", children, html = "", tooltipChildren, className } = _a, tooltipProps = __rest(_a, ["text", "tooltipClassName", "children", "html", "tooltipChildren", "className"]);
    const [elementId, setElementId] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (!elementId) {
            setElementId((0, react_uuid_1.default)());
        }
    }, [elementId]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { id: elementId, "data-tooltip-content": text, "data-tooltip-html": html, "data-tooltip-id": elementId, className: className }, children),
        react_1.default.createElement(react_tooltip_1.Tooltip, Object.assign({ anchorId: elementId, 
            // anchorSelect={elementId ? `#${elementId}` : undefined}
            className: (0, clsx_1.default)("!border-medusa-border-base !border !border-solid", "!text-compact-x-small-plus !shadow-tooltip dark:!shadow-tooltip-dark !rounded-docs_DEFAULT", "!py-docs_0.4 !z-[399] hidden !px-docs_1 lg:block", "!bg-medusa-bg-base", "!text-medusa-fg-subtle", tooltipClassName), wrapper: "span", noArrow: true, positionStrategy: "fixed" }, tooltipProps), tooltipChildren)));
};
exports.Tooltip = Tooltip;
