var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var to5 = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var assign = Object.assign || require('object.assign');
var path = require('path');
var appRoot = 'app/';
var outputRoot = 'dist/';
var del = require('del');
var vinylPaths = require('vinyl-paths');

var paths = {
  root: appRoot,
  source: [appRoot + '**/*.js', '!**/jspm_packages/**', '!**/config.js'],
  html: appRoot + '**/*.html',
  style: appRoot + '/styles/**/*.css',
  output: outputRoot
};

var compilerOptions = {
  modules: 'system',
  moduleIds: false,
  comments: false,
  compact: false,
  stage:2,
  optional: [
    "es7.decorators",
    "es7.classProperties"
  ]
};

gulp.task('build-system', function () {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.output, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy-jspm', function () {
  return gulp.src(paths.root + 'jspm_packages/**/*')
    .pipe(gulp.dest(paths.output + 'jspm_packages/'));
});

gulp.task('copy-config', function () {
  return gulp.src(paths.root + 'config.js')
    .pipe(gulp.dest(paths.output));
});

gulp.task('copy-styles', function () {
  return gulp.src(paths.style)
    .pipe(gulp.dest(paths.output + 'styles'));
});

gulp.task('build-html', function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.output));
});

gulp.task('clean', function() {
  return gulp.src([paths.output])
    .pipe(vinylPaths(del));
});

gulp.task('build', function(callback) {
  return runSequence(
    'clean',
    ['build-system', 'build-html', 'copy-jspm', 'copy-styles', 'copy-config'],
    callback
  );
});

gulp.task('serve', ['build'], function(done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['./dist'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
