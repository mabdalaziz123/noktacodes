import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'images', 'logo.svg');
const outputPath = path.join(__dirname, 'images', 'logo.png');

sharp(inputPath)
    .png()
    .resize(512, 512)
    .toFile(outputPath)
    .then(info => {
        console.log('Logo converted to PNG successfully!');
        console.log(info);
    })
    .catch(err => {
        console.error('Error converting logo:', err);
    });
