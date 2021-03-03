const dirName = './dist';
const jsNames = ['main'];
const cssNames = ['main'];
const jsRoot = './src/js/';
const cssRoot = './src/scss/';
const typesScripts = 'ts'; // or js

const creareArrayFullSrc = (arr, path, ext) => {
  return arr.map(el => `${path}${el}.${ext}`);
};

const webpackJSObj = () => {
  const filesJS = creareArrayFullSrc(jsNames, jsRoot, typesScripts);
  const obj = {};
  jsNames.forEach((file, index) => {
    obj[file] = filesJS[index];
  });

  return obj;
};

module.exports = {
  js: {
    entry: creareArrayFullSrc(jsNames, jsRoot, typesScripts),
    output: `${dirName}/js`,
    outputProd: `${dirName}/js`,
    watch: ['./src/js/**/*.js', './src/js/**/*.ts'],
    webpack: webpackJSObj()
  },
  pages: {
    entry: './src/pages/**/*.html',
    output: `${dirName}/`,
    watch: './src/**/*.html'
  },
  css: {
    entry: creareArrayFullSrc(cssNames, cssRoot, 'scss'),
    output: `${dirName}/css`,
    outputProd: `${dirName}/css`,
    watch: './src/**/*.scss'
  },
  svg: {
    entry: './src/**/svg/*.svg',
    output: `${dirName}/img`,
    watch: './src/**/svg/*.svg',
    nameFile: 'sprite.svg'
  },
  font: {
    entry: './src/fonts/**/*.*',
    output: `${dirName}/fonts/`,
    watch: './src/fonts/**/*.*'
  },
  img: {
    entry: './src/**/img/*.*',
    output: `${dirName}/img/`,
    watch: './src/**/img/*.*'
  },
  dir: `${dirName}`,
  favicon: {
    entry: './src/favicon.ico',
    output: `${dirName}/`
  },
  csscommon: {
    entry: './src/css-common/*.css',
    watch: './src/css-common/*.css',
    output: `${dirName}/css/`
  },
  php: {
    entry: './src/backend-api/**/*.php',
    watch: './src/backend-api/**/*.php',
    output: `${dirName}/backend-api/`
  }
};
