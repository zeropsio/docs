// Re-exports the pure grid utilities from grid.cjs and adds a React-flavored
// `render` that wraps highlighted/accent runs in <span> elements. The .cjs
// module is shared with the markdown-source plugin so the same ASCII art
// renders in both the live page and the .md output.
//
// `Grid` is intentionally typed loosely (`any[][]`) because the cell shape
// comes from grid.cjs. Strong typing isn't worth a parallel .d.ts file when
// the consuming React component only passes the grid through.

import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const grid = require('./grid.cjs');

export type Grid = any[][];

const SPACE = ' ';

export const make: (width: number, height: number) => Grid = grid.make;
export const text: (g: Grid, x: number, y: number, str: string, hl?: boolean) => void = grid.text;
export const textCenter: (g: Grid, cx: number, y: number, str: string, hl?: boolean) => void = grid.textCenter;
export const vline: (g: Grid, x: number, y1: number, y2: number, hl?: boolean) => void = grid.vline;
export const hline: (g: Grid, y: number, x1: number, x2: number, hl?: boolean) => void = grid.hline;
export const ch: (g: Grid, x: number, y: number, char: string, hl?: boolean) => void = grid.ch;
export const joint: (g: Grid, x: number, y: number, char: string) => void = grid.joint;

type BoxOpts = {
  x: number;
  y: number;
  w: number;
  h: number;
  lines?: string[];
  align?: 'left' | 'center';
  topLabel?: string;
  hl?: boolean;
  subtitle?: boolean;
};
export const box: (g: Grid, o: BoxOpts) => void = grid.box;
export const highlight: (g: Grid, x: number, y: number, w: number, h: number) => void = grid.highlight;
export const verify: (g: Grid) => { width: number; height: number } = grid.verify;

export function render(g: Grid): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  for (let y = 0; y < g.length; y++) {
    if (y > 0) out.push('\n');
    const row = g[y];
    let end = row.length;
    while (
      end > 0 &&
      row[end - 1].ch === SPACE &&
      !row[end - 1].hl &&
      !row[end - 1].accent
    )
      end--;
    let i = 0;
    while (i < end) {
      const hl = row[i].hl;
      const accent = !!row[i].accent;
      let j = i;
      while (j < end && row[j].hl === hl && !!row[j].accent === accent) j++;
      const seg = row
        .slice(i, j)
        .map((c: { ch: string }) => c.ch)
        .join('');
      if (hl) {
        out.push(
          <span key={`${y}-${i}`} className="ascii-graph__highlight">
            {seg}
          </span>
        );
      } else if (accent) {
        out.push(
          <span key={`${y}-${i}`} className="ascii-graph__accent">
            {seg}
          </span>
        );
      } else {
        out.push(seg);
      }
      i = j;
    }
  }
  return out;
}
