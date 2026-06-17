import fs from 'fs';
import path from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import {
  OG_IMAGE_DIR,
  extractFrontmatter,
  toOgSlug,
  walkMdxFiles,
} from '../src/plugins/og-images/utils.js';

const SITE_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(SITE_DIR, 'content');
const OUT_DIR = path.join(SITE_DIR, OG_IMAGE_DIR);
const LOGO_PATH = path.join(SITE_DIR, 'static/img/logo-icon.png');

const WIDTH = 1200;
const HEIGHT = 630;
const BG = '#0a0a0a';
const TITLE_COLOR = '#ffffff';
const DESC_COLOR = '#9ca3af';
const ACCENT = '#22d3ee';

async function loadFont(url: string, label: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${label} font: ${res.status}`);
  return res.arrayBuffer();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

function buildTemplate(opts: {
  title: string;
  description?: string | null;
  logoDataUri: string;
}) {
  const { title, description, logoDataUri } = opts;

  return {
    type: 'div',
    props: {
      style: {
        width: WIDTH,
        height: HEIGHT,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: BG,
        padding: '72px 80px',
        fontFamily: 'Inter',
        position: 'relative',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              right: -120,
              bottom: -120,
              width: 480,
              height: 480,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute',
              left: 80,
              top: 148,
              width: 120,
              height: 3,
              backgroundColor: ACCENT,
              borderRadius: 2,
              boxShadow: `0 0 24px ${ACCENT}88`,
            },
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 16 },
            children: [
              {
                type: 'img',
                props: {
                  src: logoDataUri,
                  width: 40,
                  height: 40,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#e5e7eb',
                    fontSize: 28,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                  },
                  children: 'Zerops',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              marginTop: 64,
              gap: 20,
              maxWidth: 960,
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    color: TITLE_COLOR,
                    fontSize: 64,
                    fontWeight: 700,
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                  },
                  children: truncate(title, 80),
                },
              },
              ...(description
                ? [
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: DESC_COLOR,
                          fontSize: 28,
                          lineHeight: 1.4,
                          fontWeight: 400,
                        },
                        children: truncate(description, 140),
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      ],
    },
  };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const [fontRegular, fontBold, logoBuf] = await Promise.all([
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff',
      'Inter',
    ),
    loadFont(
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff',
      'Inter Bold',
    ),
    fs.promises.readFile(LOGO_PATH),
  ]);

  const logoDataUri = `data:image/png;base64,${logoBuf.toString('base64')}`;
  const mdxFiles = walkMdxFiles(CONTENT_DIR);
  let generated = 0;

  for (const rel of mdxFiles) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, rel), 'utf8');
    const { title, description } = extractFrontmatter(raw);
    if (!title) {
      console.warn(`[generate-og] Skipping ${rel}: no title in frontmatter`);
      continue;
    }

    const slug = toOgSlug(rel);
    const svg = await satori(
      buildTemplate({ title, description, logoDataUri }),
      {
        width: WIDTH,
        height: HEIGHT,
        fonts: [
          { name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
          { name: 'Inter', data: fontBold, weight: 700, style: 'normal' },
        ],
      },
    );

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } })
      .render()
      .asPng();

    const outPath = path.join(OUT_DIR, `${slug}.png`);
    fs.writeFileSync(outPath, png);
    generated++;
    console.log(`[generate-og] ${rel} → ${slug}.png`);
  }

  console.log(`[generate-og] Done. Generated ${generated} images.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
