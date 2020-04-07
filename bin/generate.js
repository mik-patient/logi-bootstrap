const sass = require('node-sass');
const fs = require('fs');
const path = require('path');

try {
  const inputPath = path.join('scss', 'logi-bootstrap.scss');
  const inputFontPath = path.join('./', 'fonts');
  const outputPath = path.join('dist', 'logi-bootstrap.css');
  const outputFontPath = path.join('dist', 'fonts');

  const { css } = sass.renderSync({
    file: inputPath,
  });

  // Write CSS output
  fs.writeFileSync(outputPath, css);

  // Copy fonts
  fs.readdirSync(inputFontPath)
    .filter(f => !fs.statSync(`${inputFontPath}/${f}`).isDirectory())
    .forEach((f) => {
    fs.copyFileSync(`${inputFontPath}/${f}`, path.join(outputFontPath, f));
  });

  console.log('OK!');
} catch (error) {
  console.error('An error occurred!');
  console.error(error);
}

