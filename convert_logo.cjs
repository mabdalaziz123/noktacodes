const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'images', 'logo.svg');
const pngPath = path.join(__dirname, 'images', 'logo.png');

console.log(`Converting ${svgPath} to ${pngPath}...`);

sharp(svgPath, { density: 300 })
    .png()
    .toFile(pngPath)
    .then(info => {
        console.log('Conversion successful:', info);
    })
    .catch(err => {
        console.error('Error converting file:', err);
        process.exit(1);
    });
