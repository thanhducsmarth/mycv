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
    const output = path.join(outputDir, relativePath);

    // Ensure output subdir exists
    const outDir = path.dirname(output);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    console.log(`Optimizing ${inputPath} -> ${output}`);

    await sharp(inputPath)
      .resize(1200, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .png({
        quality: 85
      })
      .toFile(output);

    console.log(`✓ Optimized ${relativePath}`);
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
