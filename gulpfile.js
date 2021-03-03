const { src, dest, series, watch, parallel } = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
// Graphic
const svgSprite = require('gulp-svgstore');
const svgo = require('gulp-svgo');
const rename = require('gulp-rename');
// Html
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
// CSS
const cssmqpacker = require('postcss-sort-media-queries');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const prefixer = require('gulp-autoprefixer');
// Webpack
const webpackStream = require('webpack-stream');
const configWebpack = require('./webpack.config');
const configDevWebpack = require('./webpack.dev.config');

// Entrypoint
const configPath = require('./config.entrypoint');

const bSyncTask = () => {
  browserSync.init({
    open: false,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    },
    server: {
      baseDir: configPath.dir
    }
  });
};

const pages = () => {
  const plugins = [include({ encoding: 'utf8' })];
  return src(configPath.pages.entry)
    .pipe(posthtml(plugins))
    .pipe(dest(configPath.pages.output))
    .pipe(browserSync.stream());
};

const cleanTask = () => del([configPath.dir]);

const jsTask = () => {
  return src(configPath.js.entry)
    .pipe(webpackStream(configDevWebpack))
    .pipe(dest(configPath.js.output));
};

const jsProd = () => {
  return src(configPath.js.entry)
    .pipe(webpackStream(configWebpack))
    .pipe(dest(configPath.js.output));
};

const faviTask = () => src('./src/*.ico').pipe(dest(configPath.dir));

const fontTask = () => {
  return src(configPath.font.entry).pipe(dest(configPath.font.output));
};

const imgTask = () => {
  return src(configPath.img.entry)
    .pipe(rename({ dirname: '' }))
    .pipe(dest(configPath.img.output));
};

const copyTask = async () => {
  await faviTask();
  await fontTask();
  await imgTask();
};

const pluginsPostCSS = [
  cssmqpacker({
    sort: 'desktop-first'
  })
];

const phpTask = () => {
  return src(configPath.php.entry).pipe(dest(configPath.php.output));
};

const sassTask = () => {
  return src(configPath.css.entry, { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(pluginsPostCSS))
    .pipe(dest(configPath.css.output, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};

const sassProd = () => {
  return src(configPath.css.entry)
    .pipe(sass().on('error', sass.logError))
    .pipe(
      prefixer({
        cascade: false
      })
    )
    .pipe(postcss(pluginsPostCSS))
    .pipe(csso())
    .pipe(dest(configPath.css.outputProd));
};

const svgTask = () => {
  return src(configPath.svg.entry)
    .pipe(svgo())
    .pipe(svgSprite())
    .pipe(rename(configPath.svg.nameFile))
    .pipe(dest(configPath.svg.output));
};

const watchTask = () => {
  watch(configPath.pages.watch, series(pages));
  watch(configPath.js.watch, series(jsTask));
  watch(configPath.font.watch, series(fontTask));
  watch(configPath.img.watch, series(imgTask));
  watch(configPath.svg.watch, series(svgTask));
  watch(configPath.css.watch, series(sassTask));
};

exports.prod = series(
  cleanTask,
  parallel(pages, jsProd, copyTask, sassProd, svgTask, phpTask)
);

exports.default = series(
  cleanTask,
  parallel(pages, jsTask, copyTask, sassTask, svgTask),
  parallel(watchTask, bSyncTask)
);
