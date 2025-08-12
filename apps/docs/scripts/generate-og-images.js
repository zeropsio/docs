const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');
const glob = require('glob');
const matter = require('gray-matter');
const { slugifyWithCounter } = require('@docusaurus/utils');

const OUTPUT_DIR = path.join(__dirname, '../static/img/og');
const FONT_PATH = path.join(__dirname, '../static/font');
const LOGO_PATH = path.join(__dirname, '../static/img/logo-icon.png');
const BACKGROUND_PATH = path.join(__dirname, '../static/img/og-bg.png');
const CONTENT_DIR = path.join(__dirname, '../content');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

try {
  // Using Roboto variable font
  if (fs.existsSync(path.join(FONT_PATH, 'robot-variable.ttf'))) {
    registerFont(path.join(FONT_PATH, 'robot-variable.ttf'), { family: 'Roboto' });
    console.log('Registered Roboto variable font');
  } else {
    console.log('Roboto variable font not found, using system fonts');
  }
} catch (error) {
  console.log('Failed to register fonts, using system fonts', error);
}

/**
 * Generate OpenGraph image for a specific page
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} outputPath - Path to save the image
 */
async function generateImage(title, description, outputPath) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  const padding = 24;

  ctx.fillStyle = '#EDEFF3';
  ctx.fillRect(0, 0, 1200, 630);
  
  let bgImage;
  try {
    if (fs.existsSync(BACKGROUND_PATH)) {
      bgImage = await loadImage(BACKGROUND_PATH);
    } else {
      const altBgPaths = [
        path.join(__dirname, '../static/img/stardust.png'),
        path.join(__dirname, '../static/img/small-squares-bg.svg'),
        path.join(__dirname, '../static/img/diagrams-bg.png')
      ];
      
      for (const altPath of altBgPaths) {
        if (fs.existsSync(altPath)) {
          bgImage = await loadImage(altPath);
          console.log(`Using alternative background: ${path.basename(altPath)}`);
          break;
        }
      }
    }
    
    if (bgImage) {
      ctx.globalAlpha = 0.2;
      ctx.drawImage(bgImage, 0, 0, 1200, 630);
      ctx.globalAlpha = 1.0;
    } else {
      // Just use a solid background without a grid
      // The background is already filled with #EDEFF3 at the beginning of the function
    }
  } catch (error) {
    console.log('Error with background image, using solid color', error);
  }

  try {
    if (fs.existsSync(LOGO_PATH)) {
      const logo = await loadImage(LOGO_PATH);
      const logoHeight = 80; 
      const logoWidth = (logo.width / logo.height) * logoHeight;
      
      const logoX = 1200 - logoWidth - padding;
      const logoY = padding;
      
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
    } else {
      console.log('Logo not found, skipping logo');
    }
  } catch (error) {
    console.log('Error with logo, skipping', error);
  }


  const titleY = 450;
  
  ctx.font = '600 48px Roboto, sans-serif';
  ctx.fillStyle = '#1A1A1A';
  wrapText(ctx, title, padding, titleY, 1200 - (padding * 2), 60);

  if (description) {
    const descriptionY = titleY + 60 + 8;
    
    ctx.font = '500 30px Roboto, sans-serif';
    ctx.fillStyle = '#616A71';
    wrapText(ctx, description, padding, descriptionY, 1200 - (padding * 2), 40);
  }

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
}

/**
 * Wrap text on canvas
 */
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let testLine = '';
  let lineCount = 0;

  for (let n = 0; n < words.length; n++) {
    testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      lineCount++;
      
      if (lineCount >= 3) {
        if (n < words.length - 1) {
          ctx.fillText(line + '...', x, y);
        } else {
          ctx.fillText(line, x, y);
        }
        break;
      }
    } else {
      line = testLine;
    }
  }
  
  if (lineCount < 3) {
    ctx.fillText(line, x, y);
  }
}

/**
 * Updates the frontmatter of an MDX file to include the image property
 * @param {string} filePath - Path to the MDX file
 * @param {string} imageUrl - URL of the OG image
 */
function updateFrontmatter(filePath, imageUrl) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    if (!fileContent.startsWith('---')) {
      console.log(`No frontmatter found in ${filePath}, skipping`);
      return false;
    }
    
    const frontmatterEndIndex = fileContent.indexOf('---', 3);
    if (frontmatterEndIndex === -1) {
      console.log(`Invalid frontmatter format in ${filePath}, skipping`);
      return false;
    }
    
    const { data } = matter(fileContent);
    
    if (data.image === imageUrl) {
      console.log(`Image already set correctly in ${filePath}, skipping`);
      return true;
    }
    
    const lines = fileContent.split('\n');
    
    let closingIndex = -1;
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        closingIndex = i;
        break;
      }
    }
    
    if (closingIndex === -1) {
      console.log(`Invalid frontmatter format in ${filePath}, skipping`);
      return false;
    }
    
    let imageLineIndex = -1;
    for (let i = 1; i < closingIndex; i++) {
      if (lines[i].trim().startsWith('image:')) {
        imageLineIndex = i;
        break;
      }
    }
    
    if (imageLineIndex !== -1) {
      lines[imageLineIndex] = `image: ${imageUrl}`;
    } else {
      lines.splice(closingIndex, 0, `image: ${imageUrl}`);
    }
    
    const updatedContent = lines.join('\n');
    
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✅ Updated frontmatter for: ${filePath}`);
    
    return true;
  } catch (error) {
    console.error(`Error updating frontmatter for ${filePath}:`, error);
    return false;
  }
}

/**
 * Process all documentation files and generate OpenGraph images
 */
async function generateAllImages() {
  console.log('Generating OpenGraph images...');
  
  await generateImage(
    'Zerops Documentation',
    'Explore and learn how to use Zerops',
    path.join(OUTPUT_DIR, 'default.png')
  );
  console.log('✅ Generated default OpenGraph image');

  let files;
  try {
    const { globSync } = glob;
    files = globSync('**/*.{md,mdx}', { cwd: CONTENT_DIR });
  } catch (e) {
    files = glob.sync('**/*.{md,mdx}', { cwd: CONTENT_DIR });
  }
  
  if (!files || files.length === 0) {
    console.log('No markdown files found in content directory');
    return;
  }
  
  console.log(`Found ${files.length} markdown files to process`);
  
  const generatedImagePaths = new Set();
  
  for (const file of files) {
    try {
      const filePath = path.join(CONTENT_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      if (data.title) {
        const filePathWithoutExt = file.replace(/\.[^/.]+$/, '');
        
        const fullSlug = filePathWithoutExt.replace(/\//g, '-');
        const filenameSlug = path.basename(filePathWithoutExt);
        
        const dirParts = path.dirname(filePathWithoutExt).split('/');
        const parentDirSlug = dirParts.length > 0 && dirParts[0] !== '.' 
          ? `${dirParts[dirParts.length - 1]}-${filenameSlug}` 
          : filenameSlug;
        
        const isIndex = filenameSlug === 'index';
        const directorySlug = isIndex && dirParts.length > 0 && dirParts[0] !== '.'
          ? dirParts[dirParts.length - 1]
          : null;
        
        const sectionSlug = isIndex && dirParts.length > 0 && dirParts[0] !== '.'
          ? dirParts.join('-')
          : null;
          
        const pathParts = filePathWithoutExt.split('/');
        const pathWithoutIndex = isIndex && pathParts.length > 1 
          ? pathParts.slice(0, -1).join('-') 
          : null;
          
        let nestedPathSlug = null;
        if (pathParts.length > 1) {
          nestedPathSlug = pathParts.join('-');
        }
        
        console.log(`Processing file: ${file}`);
        console.log(`Generated slugs: full=${fullSlug}, filename=${filenameSlug}, parent=${parentDirSlug}` + 
                     (directorySlug ? `, dir=${directorySlug}` : '') +
                     (sectionSlug ? `, section=${sectionSlug}` : '') +
                     (pathWithoutIndex ? `, pathWithoutIndex=${pathWithoutIndex}` : '') +
                     (nestedPathSlug ? `, nestedPath=${nestedPathSlug}` : ''));
        
        // Only use fullSlug for generating images
        const slugsToGenerate = [fullSlug];
        
        const uniqueSlugs = [...new Set(slugsToGenerate)].filter(Boolean);
        
        const primaryImageName = `${fullSlug}.png`;
        const primaryImageOutputPath = path.join(OUTPUT_DIR, primaryImageName);
        
        if (!generatedImagePaths.has(primaryImageOutputPath)) {
          await generateImage(
            data.title,
            data.description || '',
            primaryImageOutputPath
          );
          console.log(`✅ Generated primary OG image: ${primaryImageName}`);
          generatedImagePaths.add(primaryImageOutputPath);
        }
        
        const imageUrl = `/img/og/${primaryImageName}`;
        updateFrontmatter(filePath, imageUrl);
        
        for (const slug of uniqueSlugs) {
          if (slug === fullSlug) continue;
          
          const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);
          
          if (generatedImagePaths.has(outputPath)) {
            console.log(`⏩ Skipping duplicate: ${slug}.png`);
            continue;
          }
          
          await generateImage(
            data.title,
            data.description || '',
            outputPath
          );
          console.log(`✅ Generated additional OG image: ${slug}.png`);
          generatedImagePaths.add(outputPath);
        }
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
  
  console.log(`✨ All OpenGraph images generated successfully! (${generatedImagePaths.size} unique images)`);
  console.log(`✨ Updated frontmatter in all MDX files with image property`);
}

generateAllImages().catch(error => {
  console.error('Fatal error in OpenGraph image generation:', error);
  process.exit(0);
}); 