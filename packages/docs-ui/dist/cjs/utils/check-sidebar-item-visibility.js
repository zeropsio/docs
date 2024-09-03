"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSidebarItemVisibility = void 0;
const TOP_MARGIN = 57;
function checkSidebarItemVisibility(item, withTransition = false) {
    return withTransition
        ? checkSidebarItemVisibilityTransition(item)
        : checkSidebarItemVisibilityRelative(item);
}
exports.checkSidebarItemVisibility = checkSidebarItemVisibility;
function checkSidebarItemVisibilityRelative(item) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        return false;
    }
    const sidebarBoundingRect = sidebar.getBoundingClientRect();
    const sidebarTop = sidebarBoundingRect.top - TOP_MARGIN;
    const sidebarBottom = sidebarTop + sidebarBoundingRect.height;
    const itemBoundingRect = item.getBoundingClientRect();
    const itemTop = item.offsetParent === sidebar ? item.offsetTop : itemBoundingRect.top;
    const itemBottom = itemTop + itemBoundingRect.height;
    return itemTop >= sidebarTop && itemBottom <= sidebarBottom;
}
function checkSidebarItemVisibilityTransition(item) {
    const sidebar = document.getElementById("sidebar");
    if (!sidebar) {
        return false;
    }
    const sidebarBoundingRect = sidebar.getBoundingClientRect();
    const activeItemBoundingRect = item.getBoundingClientRect();
    return (activeItemBoundingRect.top >= TOP_MARGIN &&
        activeItemBoundingRect.top - sidebarBoundingRect.height + TOP_MARGIN < 0 &&
        activeItemBoundingRect.bottom > 0);
}
