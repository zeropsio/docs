"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavbarMobileMenu = void 0;
const react_1 = __importDefault(require("react"));
const Button_1 = require("./Button");
const ColorModeToggle_1 = require("../ColorModeToggle");
const SearchModalOpener_1 = require("../SearchModalOpener");
const providers_1 = require("../../../providers");
const clsx_1 = __importDefault(require("clsx"));
const Logo_1 = require("../Logo");
const NavbarMobileMenu = ({ menuButton, logo, }) => {
    var _a;
    const { isMobile } = (0, providers_1.useMobile)();
    return (react_1.default.createElement("div", { className: "flex w-full items-center justify-between lg:hidden" }, isMobile && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Button_1.NavbarMobileMenuButton, Object.assign({}, menuButton, { buttonProps: Object.assign(Object.assign({}, (menuButton.buttonProps || {})), { className: (0, clsx_1.default)((_a = menuButton.buttonProps) === null || _a === void 0 ? void 0 : _a.className, "!border-none !bg-transparent !bg-no-image !shadow-none") }) })),
        react_1.default.createElement(Logo_1.NavbarLogo, Object.assign({}, logo, { className: "lg:hidden", imageClassName: "mx-auto" })),
        react_1.default.createElement("div", { className: "flex" },
            react_1.default.createElement(SearchModalOpener_1.NavbarSearchModalOpener, null),
            react_1.default.createElement(ColorModeToggle_1.NavbarColorModeToggle, { buttonProps: {
                    className: "!border-none !bg-transparent !bg-no-image !shadow-none ml-docs_1",
                } }))))));
};
exports.NavbarMobileMenu = NavbarMobileMenu;
