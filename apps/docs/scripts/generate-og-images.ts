import fs from 'fs';
import path from 'path';
import glob from 'glob';
import { ImageResponse } from '@vercel/og';
import OpenGraphImage from '../src/components/OpenGraph';

interface Frontmatter {
  title: string;
  description: string;
  og?: {
    title?: string;
    description?: string;
    layout?: 'default' | 'dashboard' | 'code' | 'terminal';
    background?: string;
  };
}

async function generateOGImage(
  title: string,
  description: string,
  type: 'feature' | 'guide' | 'reference',
  outputPath: string,
  layout?: 'default' | 'dashboard' | 'code' | 'terminal',
  background?: string
) {
  const imageResponse = await OpenGraphImage({
    title,
    description,
    type,
    layout,
    background
  });

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

function determineLayout(filePath: string): 'default' | 'dashboard' | 'code' | 'terminal' {
  if (filePath.includes('/features/')) {
    return 'dashboard';
  }
  if (filePath.includes('/references/')) {
    return 'code';
  }
  if (filePath.includes('/how-to/')) {
    return 'terminal';
  }
  return 'default';
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
      const layout = frontmatter.og?.layout || determineLayout(file);

      await generateOGImage(
        frontmatter.og?.title || frontmatter.title,
        frontmatter.og?.description || frontmatter.description,
        contentType,
        outputPath,
        layout,
        frontmatter.og?.background
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

const createFolderIfNotExists = async (folderPath: string) => {
  try {
    await fs.promises.mkdir(folderPath, { recursive: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
      throw error;
    }
  }
};

generateOGImages().catch(console.error); 