const fs = require('fs/promises');
const path = require('path');
const { glob } = require('glob');
const OGImage = require('../src/components/OpenGraph/index.tsx').default;

interface Frontmatter {
  title: string;
  description?: string;
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
          acc[key.trim()] = valueParts.join(':').trim();
        }
        return acc;
      }, {});

    return frontmatter as Frontmatter;
  } catch (error) {
    console.error(`Error parsing frontmatter: ${error}`);
    return null;
  }
}

async function generateOGImage(
  title: string,
  description: string | undefined,
  outputPath: string
) {
  const imageResponse = await OGImage({
    title,
    description,
  });

  const buffer = await imageResponse.arrayBuffer();
  await fs.writeFile(outputPath, Buffer.from(buffer));
}

async function generateOGImages() {
  console.log('Starting OG image generation...');
  
  const contentDir = path.join(process.cwd(), 'content');
  const outputDir = path.join(process.cwd(), 'static/img/og');
  
  // Ensure output directory exists
  try {
    await fs.mkdir(outputDir, { recursive: true });
  } catch (error) {
    // Ignore if directory already exists
  }

  // Find all MDX files
  const files = await glob('**/*.mdx', { cwd: contentDir });
  console.log(`Found ${files.length} MDX files`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const frontmatter = await extractFrontmatter(content);

      if (!frontmatter) {
        console.warn(`⚠️ No frontmatter found in ${file}`);
        errorCount++;
        continue;
      }

      if (!frontmatter.title) {
        console.warn(`⚠️ Missing title in ${file}`);
        errorCount++;
        continue;
      }

      // Get the directory path and filename
      const dirPath = path.dirname(file);
      const fileName = path.basename(file, '.mdx');
      
      // Create a unique filename by combining directory path and filename
      const uniqueFileName = dirPath === '.' ? fileName : dirPath.replace(/\//g, '-') + '-' + fileName;
      const outputPath = path.join(outputDir, uniqueFileName + '.png');

      await generateOGImage(
        frontmatter.title,
        frontmatter.description,
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