const sass = require('node-sass');
const fs = require('fs');

try {
  const { css } = sass.renderSync({
    file: './test/test.scss',
  });

  // Write CSS output
  fs.writeFileSync('./dist/logi-bootstrap.css', css);

  // Copy fonts
  const fontDirectory = './fonts';
  fs.readdirSync(fontDirectory)
    .filter(f => !fs.statSync(`${fontDirectory}/${f}`).isDirectory())
    .forEach((f) => {
    fs.copyFileSync(`${fontDirectory}/${f}`, `./dist/${fontDirectory}/${f}`);
  });

  console.log('OK!');
} catch (error) {
  console.error('An error occurred!');
  console.error(error);
}

