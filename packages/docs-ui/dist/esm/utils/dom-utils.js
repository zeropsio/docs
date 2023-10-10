export function findPrevSibling(element, selector) {
    let prevElement = element.previousElementSibling;
    while (prevElement !== null) {
        if (prevElement.matches(selector)) {
            return prevElement;
        }
        prevElement = prevElement.previousElementSibling;
    }
    return null;
}
export function findNextSibling(element, selector) {
    let nextElement = element.nextElementSibling;
    while (nextElement !== null) {
        if (nextElement.matches(selector)) {
            return nextElement;
        }
        nextElement = nextElement.nextElementSibling;
    }
    return null;
}
