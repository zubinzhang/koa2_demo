/**
 * [gulp description]
 * @type {[type]}
 */
const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const cached = require('gulp-cached');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const concat = require('gulp-concat'); //- 多个文件合并为一个；
const cleanCss = require('gulp-clean-css'); //- 压缩CSS为一行；
const processhtml = require('gulp-processhtml');
const htmlmin = require('gulp-htmlmin'); //html压缩

/**
 * ----------------------------------------------------
 * source configuration
 * ----------------------------------------------------
 */
/**
 * 源文件目录
 */
const src = {
  server: ['src/**/*.js', '!src/views/**', '!src/public/**'],
  html: ['src/views/**/*.ejs', 'src/views/**/*.html'],
  asserts: ['src/public/**', '!src/public/javascripts/**','!src/public/stylesheets/**','!src/public/images/**'],
  style: 'src/public/stylesheets/**/*',
  js: 'src/public/javascripts/**/*.js',
  images: 'src/public/images/**/*',
};

// 开发时临时打包目录
const build = {
  root: 'build/',
  server: 'build/',
  html: 'build/views/',
  style: 'build/public/stylesheets/',
  asserts: 'build/public/',
  js: 'build/public/javascripts/',
  images: 'build/public/images/',
};

/**
 * ----------------------------------------------------
 *  tasks
 * ----------------------------------------------------
 */

/**
 * clean build dir
 */
function clean(done) {
  del.sync(build.root);
  done();
}

/**
 * copy asserts
 */
function copyAsserts() {
  return gulp.src(src.asserts)
    .pipe(gulp.dest(build.asserts));
}

/**
 * build html
 */
function html() {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    // removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    // removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };
  return gulp.src(src.html)
    .pipe(processhtml())
    .pipe(htmlmin(options))
    .pipe(gulp.dest(build.html));
}

/**
 * build css flile
 */
function style() {
  return gulp.src(src.style)
    .pipe(cached('style'))
    // .pipe(sass())
    .on('error', handleError)
    .pipe(autoprefixer({
      browsers: ['last 3 version'],
    }))
    .pipe(cleanCss()) //- 压缩处理成一行
    .pipe(gulp.dest(build.style));
}

/**
 * build js flile
 */
function js() {
  return gulp.src(src.js)
    .pipe(uglify().on('error', handleError))
    .pipe(gulp.dest(build.js));
}

/**
 * babel转换
 */
function server() {
  return gulp.src(src.server)
    .pipe(babel({
      presets: ['es2015', 'stage-0']
    }))
    .pipe(gulp.dest(build.server));
}



/**
 * [handleError description]
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
function handleError(err) {
  if (err.message) {
    console.log(err.message);
  } else {
    console.log(err);
  }
  this.emit('end');
}

/**
 * [watch description]
 * @return {[type]} [description]
 */
function watch() {
  gulp.watch(src.server, server);
  gulp.watch(src.html, html);
  gulp.watch(src.js, js);
  gulp.watch(src.style, style);
}


/**
 * default task
 */
gulp.task('default', gulp.series(
  clean,
  gulp.parallel(copyAsserts, html, style, js, server)
));

/**
 * production build task
 */
gulp.task('watch', watch);


/**
 * [reload description]
 * @return {[type]} [description]
 */
function reload() {
  connect.reload();
}
