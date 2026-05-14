'use strict';

// Build functions for the ZCP topology diagram. Pure functions that produce
// a Grid (from grid.cjs). Consumed by:
//   - the React component (index.tsx) for the interactive Remote/Local toggle
//   - the markdown-source plugin to render the same ASCII into .md output

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
} = require('./grid.cjs');

const W = 80;
const PROJECT_W = 62;

function buildProject(g, mode) {
    const yTop = 3;
    const yBottom = 31;

    box(g, { x: 0, y: yTop, w: PROJECT_W, h: yBottom - yTop + 1 });
    textCenter(g, 31, yTop + 1, 'Zerops development project (private network)');

    box(g, {
        x: 2, y: 5, w: 19, h: 5,
        lines: ['project ctrl', '+ L3 balancer', '+ firewall'],
    });
    box(g, { x: 23, y: 5, w: 12, h: 5, lines: ['stats'], align: 'center' });
    box(g, { x: 37, y: 5, w: 12, h: 5, lines: ['logger'], align: 'center' });

    box(g, {
        x: 2, y: 11, w: 19, h: 4,
        lines: ['L7 balancer', '(Nginx)'],
        align: 'center',
    });

    joint(g, 11, 9, '┬');
    vline(g, 11, 10, 10);
    joint(g, 11, 11, '┴');

    joint(g, 11, 14, '┬');
    vline(g, 11, 15, 15);
    joint(g, 11, 16, '├');

    if (mode === 'remote') {
        hline(g, 16, 12, 46);
        joint(g, 29, 16, '┬');
        joint(g, 47, 16, '┐');
    } else {
        hline(g, 16, 12, 28);
        joint(g, 29, 16, '┐');
    }

    box(g, {
        x: 4, y: 17, w: 15, h: 4,
        lines: ['appdev:3000', 'dev runtime'],
    });
    joint(g, 11, 17, '┴');
    joint(g, 11, 20, '┬');
    vline(g, 11, 21, 21);

    box(g, {
        x: 21, y: 17, w: 17, h: 4,
        lines: ['appstage:3000', 'stage runtime'],
    });
    joint(g, 29, 17, '┴');
    joint(g, 29, 20, '┬');
    vline(g, 29, 21, 21);

    if (mode === 'remote') {
        box(g, {
            x: 40, y: 17, w: 15, h: 4,
            lines: ['zcp service', 'agent + MCP'],
            align: 'center',
            hl: true,
        });
        joint(g, 47, 17, '┴');
        joint(g, 47, 20, '┬');
        vline(g, 47, 21, 21);
        textCenter(g, 47, 13, 'control plane');
        textCenter(g, 47, 14, 'ssh into other services');
        textCenter(g, 47, 15, 'dev runtime fs mounted');
    }

    joint(g, 11, 22, '└');
    if (mode === 'remote') {
        hline(g, 22, 12, 46);
        joint(g, 29, 22, '┼');
        joint(g, 47, 22, '┘');
    } else {
        hline(g, 22, 12, 28);
        joint(g, 20, 22, '┬');
        joint(g, 29, 22, '┘');
    }

    const downCol = mode === 'remote' ? 29 : 20;
    vline(g, downCol, 23, 23);

    joint(g, 14, 24, '┌');
    hline(g, 24, 15, 41);
    joint(g, downCol, 24, '┴');
    joint(g, 42, 24, '┐');

    vline(g, 14, 25, 25);
    vline(g, 42, 25, 25);

    box(g, { x: 7, y: 26, w: 15, h: 4, lines: ['db:5432', 'Postgres'] });
    joint(g, 14, 26, '┴');

    box(g, { x: 35, y: 26, w: 15, h: 4, lines: ['cache:6379', 'Valkey'] });
    joint(g, 42, 26, '┴');
}

function buildRemote() {
    const g = make(W, 32);
    textCenter(g, 31, 0, 'https://my-app.com');
    vline(g, 31, 1, 1);
    ch(g, 31, 2, '▼');
    buildProject(g, 'remote');
    verify(g);
    return g;
}

function buildLocal() {
    const g = make(W, 44);
    textCenter(g, 31, 0, 'https://my-app.com');
    vline(g, 31, 1, 1);
    ch(g, 31, 2, '▼');
    buildProject(g, 'local');

    joint(g, 31, 31, '▲');

    vline(g, 31, 32, 34);
    text(g, 33, 33, 'VPN tunnel');

    box(g, {
        x: 14, y: 35, w: 35, h: 9,
        lines: [
            'IDE / terminal',
            '+ agent',
            '+ zcp MCP',
            '',
            '$ curl zerops.io/zcp/install.sh',
            '$ zcp init',
            '$ zcli vpn up',
        ],
        align: 'left',
        hl: true,
    });
    joint(g, 31, 35, '┴');

    verify(g);
    return g;
}

module.exports = {
    buildProject,
    buildRemote,
    buildLocal,
    W,
    PROJECT_W,
};
