const fs = require("fs");
const sharp = require("sharp");

// Input and output directories
const inputDir = "./input";
const outputDir = "./output";

// Check if output directory exists, create if it doesn't
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Get list of files in input directory
fs.readdir(inputDir, (err, files) => {
  if (err) throw err;

  // Filter out non-JPEG and non-PNG files
  const imageFiles = files.filter((file) => /\.(jpe?g|png)$/i.test(file));

  // Process each image file
  imageFiles.forEach((file) => {
    const inputPath = `${inputDir}/${file}`;
    const outputPath = `${outputDir}/${file.replace(
      /\.(jpe?g|png)$/i,
      ".webp"
    )}`;

    // Use sharp to convert image to WebP format
    sharp(inputPath)
      .webp()
      .toFile(outputPath, (err, info) => {
        if (err) throw err;
        console.log(`${file} converted to WebP`);
      });
  });
});
