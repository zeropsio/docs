'use strict';

// Pure grid utilities — used by the React component (CodingAgentsTopology,
// IntroAgentVisual) and by the markdown-source plugin to render the same
// ASCII art as plain text into the .md output.
//
// Mirrors the API of the original grid.tsx but returns plain strings rather
// than React nodes from `render`. The .tsx wrapper (`grid.tsx`) delegates
// here for the grid math and re-implements `render` to emit React nodes
// with `<span>` highlights.

const SPACE = ' ';

function make(width, height) {
    return Array.from({ length: height }, () =>
        Array.from({ length: width }, () => ({ ch: SPACE, hl: false }))
    );
}

function put(g, x, y, ch, hl) {
    if (y < 0 || y >= g.length) return;
    if (x < 0 || x >= g[0].length) return;
    g[y][x] = { ch, hl };
}

function text(g, x, y, str, hl = false) {
    for (let i = 0; i < str.length; i++) put(g, x + i, y, str[i], hl);
}

function textCenter(g, cx, y, str, hl = false) {
    text(g, cx - Math.floor(str.length / 2), y, str, hl);
}

function vline(g, x, y1, y2, hl = false) {
    const [a, b] = y1 <= y2 ? [y1, y2] : [y2, y1];
    for (let y = a; y <= b; y++) put(g, x, y, '│', hl);
}

function hline(g, y, x1, x2, hl = false) {
    const [a, b] = x1 <= x2 ? [x1, x2] : [x2, x1];
    for (let x = a; x <= b; x++) put(g, x, y, '─', hl);
}

function ch(g, x, y, char, hl = false) {
    put(g, x, y, char, hl);
}

function joint(g, x, y, char) {
    if (y < 0 || y >= g.length || x < 0 || x >= g[0].length) return;
    g[y][x] = { ch: char, hl: g[y][x].hl };
}

function box(g, o) {
    const { x, y, w, h, lines = [], align = 'left', topLabel, hl = false, subtitle = false } = o;
    if (hl) {
        for (let yy = y + 1; yy < y + h - 1; yy++) {
            for (let xx = x + 1; xx < x + w - 1; xx++) {
                put(g, xx, yy, SPACE, true);
            }
        }
    }
    put(g, x, y, '┌', hl);
    put(g, x + w - 1, y, '┐', hl);
    put(g, x, y + h - 1, '└', hl);
    put(g, x + w - 1, y + h - 1, '┘', hl);
    for (let i = 1; i < w - 1; i++) {
        put(g, x + i, y, '─', hl);
        put(g, x + i, y + h - 1, '─', hl);
    }
    for (let i = 1; i < h - 1; i++) {
        put(g, x, y + i, '│', hl);
        put(g, x + w - 1, y + i, '│', hl);
    }
    if (topLabel) {
        const label = ` ${topLabel} `;
        for (let i = 0; i < label.length && 2 + i < w - 2; i++) {
            put(g, x + 2 + i, y, label[i], hl);
        }
    }
    const inner = w - 2;
    for (let i = 0; i < lines.length; i++) {
        if (1 + i >= h - 1) break;
        const line = lines[i];
        const startCol =
            align === 'center'
                ? x + 1 + Math.floor((inner - line.length) / 2)
                : x + 2;
        const accent = subtitle && i > 0;
        for (let j = 0; j < line.length; j++) {
            if (startCol + j >= x + w - 1) break;
            const yy = y + 1 + i;
            const xx = startCol + j;
            if (yy < 0 || yy >= g.length || xx < 0 || xx >= g[0].length) continue;
            g[yy][xx] = { ch: line[j], hl, accent };
        }
    }
}

function highlight(g, x, y, w, h) {
    for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
            if (yy < 0 || yy >= g.length || xx < 0 || xx >= g[0].length) continue;
            g[yy][xx] = { ch: g[yy][xx].ch, hl: true };
        }
    }
}

function verify(g) {
    const width = g[0]?.length ?? 0;
    for (const row of g) {
        if (row.length !== width) throw new Error('Grid rows have inconsistent width');
    }
    return { width, height: g.length };
}

// Plain-text rendering for the markdown plugin. Drops React span wrappers
// and emits trailing-whitespace-trimmed lines joined with '\n'.
function renderText(g) {
    const lines = [];
    for (const row of g) {
        let end = row.length;
        while (
            end > 0 &&
            row[end - 1].ch === SPACE &&
            !row[end - 1].hl &&
            !row[end - 1].accent
        ) {
            end--;
        }
        let line = '';
        for (let i = 0; i < end; i++) line += row[i].ch;
        lines.push(line);
    }
    return lines.join('\n');
}

module.exports = {
    make,
    text,
    textCenter,
    vline,
    hline,
    ch,
    joint,
    box,
    highlight,
    verify,
    renderText,
};
