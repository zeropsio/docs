import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { ImageResponse } from '@vercel/og';
import { createFolderIfNotExists } from './utils';

interface Frontmatter {
  title: string;
  description: string;
  og?: {
    title?: string;
    description?: string;
  };
}

async function generateOGImage(
  title: string,
  description: string,
  type: 'feature' | 'guide' | 'reference',
  outputPath: string
) {
  const imageResponse = new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F172A',
          padding: '48px',
        }}
      >
        {/* Logo and Type Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img
            src={path.join(process.cwd(), 'static/img/logo.svg')}
            alt="Zerops"
            width={180}
            height={48}
          />
          <div
            style={{
              backgroundColor: '#1E293B',
              padding: '8px 16px',
              borderRadius: '8px',
              color: '#94A3B8',
              fontSize: '16px',
              textTransform: 'uppercase',
            }}
          >
            {type}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 1,
            gap: '24px',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              color: '#F8FAFC',
              lineHeight: 1.2,
              margin: 0,
              fontFamily: 'Inter',
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#94A3B8',
              lineHeight: 1.5,
              margin: 0,
              fontFamily: 'Inter',
              fontWeight: 400,
            }}
          >
            {description}
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#64748B',
            fontSize: '16px',
            fontFamily: 'Inter',
          }}
        >
          <span>docs.zerops.io</span>
          <span>Developer-First Cloud Platform</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fs.readFileSync(path.join(process.cwd(), 'static/fonts/Inter-Bold.ttf')),
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: fs.readFileSync(path.join(process.cwd(), 'static/fonts/Inter-Regular.ttf')),
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );

  const buffer = await imageResponse.arrayBuffer();
  await fs.promises.writeFile(outputPath, Buffer.from(buffer));
}

async function getContentType(filePath: string): Promise<'feature' | 'guide' | 'reference'> {
  if (filePath.includes('/features/')) return 'feature';
  if (filePath.includes('/guides/')) return 'guide';
  return 'reference';
}

async function extractFrontmatter(content: string): Promise<Frontmatter | null> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  if (!match) return null;

  try {
    const frontmatter = match[1]
      .split('\n')
      .reduce((acc: Record<string, any>, line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim();
          if (key.includes('.')) {
            const [parent, child] = key.split('.');
            acc[parent] = acc[parent] || {};
            acc[parent][child] = value;
          } else {
            acc[key.trim()] = value;
          }
        }
        return acc;
      }, {});

    return frontmatter as Frontmatter;
  } catch (error) {
    console.error(`Error parsing frontmatter: ${error}`);
    return null;
  }
}

async function generateOGImages() {
  console.log('Starting OG image generation...');
  
  const contentDir = path.join(process.cwd(), 'content');
  const outputDir = path.join(process.cwd(), 'static/img/og');
  const fontsDir = path.join(process.cwd(), 'static/fonts');
  
  // Ensure required directories exist
  await createFolderIfNotExists(outputDir);
  await createFolderIfNotExists(fontsDir);

  // Find all MDX files
  const files = glob.sync('**/*.mdx', { cwd: contentDir });
  console.log(`Found ${files.length} MDX files`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      const frontmatter = await extractFrontmatter(content);

      if (!frontmatter) {
        console.warn(`⚠️ No frontmatter found in ${file}`);
        errorCount++;
        continue;
      }

      if (!frontmatter.title || !frontmatter.description) {
        console.warn(`⚠️ Missing required frontmatter in ${file}`);
        errorCount++;
        continue;
      }

      const outputFileName = path.basename(file, '.mdx') + '.png';
      const outputPath = path.join(outputDir, outputFileName);
      const contentType = await getContentType(file);

      await generateOGImage(
        frontmatter.og?.title || frontmatter.title,
        frontmatter.og?.description || frontmatter.description,
        contentType,
        outputPath
      );
      
      console.log(`✅ Generated OG image for ${file}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error generating OG image for ${file}:`, error);
      errorCount++;
    }
  }

  console.log('\nOG Image Generation Summary:');
  console.log(`✅ Successfully generated: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`Total files processed: ${files.length}`);
}

generateOGImages().catch(console.error); 