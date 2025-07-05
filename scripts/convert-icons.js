const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, '../assets/icons');

async function convertSvgToPng(svgPath) {
  const pngPath = svgPath.replace('.svg', '.png');
  const svgBuffer = fs.readFileSync(svgPath);
  
  await sharp(svgBuffer)
    .resize(48, 48) // Double size for retina displays
    .png()
    .toFile(pngPath);
    
  console.log(`Converted ${path.basename(svgPath)} to PNG`);
}

async function convertAllIcons() {
  const files = fs.readdirSync(ICONS_DIR);
  const svgFiles = files.filter(file => file.endsWith('.svg'));
  
  for (const file of svgFiles) {
    await convertSvgToPng(path.join(ICONS_DIR, file));
  }
}

convertAllIcons().catch(console.error); 