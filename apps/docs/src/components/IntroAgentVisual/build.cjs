'use strict';

// Build function for the agents-to-recipes-to-projects intro visual.
// Pure JS, no React. Consumed by:
//   - the React component (index.tsx) for the live page (renders logo images
//     absolutely positioned over the ASCII grid)
//   - the markdown-source plugin to render the same diagram as plain text
//     (logos rendered as their alt text overlaid into the grid)

const {
    make,
    text,
    textCenter,
    vline,
    hline,
    ch,
    joint,
    box,
    verify,
} = require('../CodingAgentsTopology/grid.cjs');

const W = 86;

const AGENTS = [
    { src: '/img/recipes/claude.png',   alt: 'Claude Code' },
    { src: '/img/recipes/codex.svg',    alt: 'Codex' },
    { src: '/img/recipes/gemini.svg',   alt: 'Gemini CLI' },
    { src: '/img/recipes/opencode.png', alt: 'opencode' },
];

const RECIPES = [
    { src: '/img/recipes/zerops/bun.svg',     alt: 'Bun' },
    { src: '/img/recipes/zerops/deno.svg',    alt: 'Deno' },
    { src: '/img/recipes/zerops/nodejs.svg',  alt: 'Node.js' },
    { src: '/img/recipes/zerops/golang.svg',  alt: 'Go' },
    { src: '/img/recipes/zerops/java.svg',    alt: 'Java' },
    { src: '/img/recipes/zerops/python.svg',  alt: 'Python' },
    { src: '/img/recipes/zerops/rust.svg',    alt: 'Rust' },
    { src: '/img/recipes/zerops/gleam.svg',   alt: 'Gleam' },
    { src: '/img/recipes/zerops/ruby.svg',    alt: 'Ruby' },
    { src: '/img/recipes/zerops/php.svg',     alt: 'PHP' },
    { src: '/img/recipes/zerops/dotnet.svg',  alt: '.NET' },
    { src: '/img/recipes/zerops/laravel.svg', alt: 'Laravel' },
    { src: '/img/recipes/zerops/nextjs.svg',  alt: 'Next.js' },
    { src: '/img/recipes/zerops/nuxt.svg',    alt: 'Nuxt' },
    { src: '/img/recipes/zerops/astro.svg',   alt: 'Astro' },
    { src: '/img/recipes/zerops/svelte.svg',  alt: 'Svelte' },
    { src: '/img/recipes/zerops/react.svg',   alt: 'React' },
    { src: '/img/recipes/zerops/vue.svg',     alt: 'Vue' },
    { src: '/img/recipes/zerops/angular.png', alt: 'Angular' },
    { src: '/img/recipes/zerops/solid.svg',   alt: 'Solid' },
    { src: '/img/recipes/zerops/qwik.svg',    alt: 'Qwik' },
    { src: '/img/recipes/zerops/analog.svg',  alt: 'Analog' },
    { src: '/img/recipes/zerops/nestjs.svg',  alt: 'Nest.js' },
];

function buildLayout() {
    const g = make(W, 41);
    const logos = [];

    box(g, { x: 2, y: 0, w: 16, h: 8, topLabel: 'ZCP MCP' });
    const AGENT_POS = [
        [6, 2], [13, 2],
        [6, 5], [13, 5],
    ];
    AGENTS.forEach((a, i) => {
        const [col, row] = AGENT_POS[i];
        logos.push({ src: a.src, alt: a.alt, col, row });
    });

    box(g, { x: 22, y: 0, w: 58, h: 11, topLabel: 'recipes for any stack' });
    const RECIPE_COLS = [26, 33, 40, 47, 54, 61, 68, 75];
    RECIPES.forEach((r, i) => {
        const rowIdx = Math.floor(i / 8);
        const colIdx = i % 8;
        const row = 2 + rowIdx * 3;
        logos.push({ src: r.src, alt: r.alt, col: RECIPE_COLS[colIdx], row });
    });

    joint(g, 17, 4, '├');
    hline(g, 4, 18, 20);
    ch(g, 21, 4, '►');

    textCenter(g, 42, 12, 'zcp with agent has root ssh access to runtime services,');
    textCenter(g, 42, 13, 'runs dev server on dev, deploys to stage, verifies');

    joint(g, 10, 7, '┬');
    vline(g, 10, 8, 14);
    joint(g, 10, 15, '├');
    hline(g, 15, 11, 73);
    joint(g, 74, 15, '┐');

    vline(g, 10, 16, 16);
    joint(g, 10, 17, '┼');
    vline(g, 10, 18, 18);
    ch(g, 10, 19, '▼');

    vline(g, 74, 16, 16);
    joint(g, 74, 17, '┼');
    vline(g, 74, 18, 18);
    ch(g, 74, 19, '▼');

    box(g, { x: 0, y: 17, w: 60, h: 23, topLabel: 'complex project' });

    box(g, { x:  3, y: 20, w: 14, h: 4, lines: ['zcp', 'Ubuntu'], align: 'center', hl: true, subtitle: true });

    box(g, { x:  3, y: 25, w: 14, h: 4, lines: ['appdev',    'Bun'],    align: 'center', subtitle: true });
    box(g, { x: 23, y: 25, w: 14, h: 4, lines: ['apidev',    'Golang'], align: 'center', subtitle: true });
    box(g, { x: 43, y: 25, w: 14, h: 4, lines: ['workerdev', 'Python'], align: 'center', subtitle: true });

    box(g, { x:  3, y: 30, w: 14, h: 4, lines: ['appstage',    'Bun'],    align: 'center', subtitle: true });
    box(g, { x: 23, y: 30, w: 14, h: 4, lines: ['apistage',    'Golang'], align: 'center', subtitle: true });
    box(g, { x: 43, y: 30, w: 14, h: 4, lines: ['workerstage', 'Python'], align: 'center', subtitle: true });

    box(g, { x:  3, y: 35, w: 10, h: 4, lines: ['db',      'Postgres'], align: 'center', subtitle: true });
    box(g, { x: 14, y: 35, w: 10, h: 4, lines: ['search',  'Elastic'],  align: 'center', subtitle: true });
    box(g, { x: 25, y: 35, w: 10, h: 4, lines: ['broker',  'NATS'],     align: 'center', subtitle: true });
    box(g, { x: 36, y: 35, w: 10, h: 4, lines: ['cache',   'Valkey'],   align: 'center', subtitle: true });
    box(g, { x: 47, y: 35, w: 10, h: 4, lines: ['storage', 'S3'],       align: 'center', subtitle: true });

    box(g, { x: 64, y: 17, w: 22, h: 18, topLabel: 'simple project' });

    box(g, { x: 69, y: 20, w: 12, h: 4, lines: ['zcp', 'Ubuntu'],        align: 'center', hl: true, subtitle: true });
    box(g, { x: 69, y: 25, w: 12, h: 4, lines: ['appdev',   'Node.js'],  align: 'center', subtitle: true });
    box(g, { x: 69, y: 30, w: 12, h: 4, lines: ['appstage', 'Node.js'],  align: 'center', subtitle: true });

    verify(g);
    return { grid: g, logos };
}

module.exports = {
    buildLayout,
    AGENTS,
    RECIPES,
    W,
};
