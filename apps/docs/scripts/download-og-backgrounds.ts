import fs from 'fs';
import path from 'path';
import https from 'https';

const BACKGROUNDS = {
  dashboard: 'https://raw.githubusercontent.com/zeropsio/docs/main/static/img/screenshots/dashboard.png',
  code: 'https://raw.githubusercontent.com/zeropsio/docs/main/static/img/screenshots/code-editor.png',
  terminal: 'https://raw.githubusercontent.com/zeropsio/docs/main/static/img/screenshots/terminal.png'
};

async function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${filepath}`);
        resolve();
      });

      fileStream.on('error', (error) => {
        fs.unlink(filepath, () => reject(error));
      });
    }).on('error', reject);
  });
}

async function downloadBackgrounds() {
  const outputDir = path.join(process.cwd(), 'public/img/og-backgrounds');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [name, url] of Object.entries(BACKGROUNDS)) {
    const filepath = path.join(outputDir, `${name}.png`);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${name}:`, error);
    }
  }
}

downloadBackgrounds().catch(console.error); 