const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/images';
const outputDir = './public/images-optimized';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function* walkSync(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      if (file.name !== 'README.md' && !file.name.startsWith('.')) {
        yield* walkSync(path.join(dir, file.name));
      }
    } else {
      if (/\.(jpg|jpeg|png)$/i.test(file.name)) {
        yield path.join(dir, file.name);
      }
    }
  }
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const relativePath = path.relative(inputDir, inputPath);
    // Change extension to .webp
    const webpRelativePath = relativePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const output = path.join(outputDir, webpRelativePath);

    // Ensure output subdir exists
    const outDir = path.dirname(output);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    console.log(`Optimizing ${inputPath} -> ${output}`);

    await sharp(inputPath)
      .rotate() // Auto-rotate based on EXIF before resizing/converting
      .resize(1920, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: 85,
        effort: 4 // Good balance between compression speed and size
      })
      .toFile(output);

    console.log(`✓ Optimized ${webpRelativePath}`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('Starting image optimization...');

  const imageFiles = Array.from(walkSync(inputDir));

  for (const file of imageFiles) {
    await optimizeImage(file, outputDir);
  }

  console.log('Image optimization complete!');
  console.log(`Processed ${imageFiles.length} images`);
  console.log(`Optimized images saved to: ${outputDir}`);
  console.log('To use them, replace public/images with public/images-optimized');
}

main().catch(console.error);
