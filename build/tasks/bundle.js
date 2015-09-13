var gulp = require('gulp');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');
var paths = require('../paths');
var del = require('del');
var expect = require('gulp-expect-file');
var bundle = require('aurelia-bundler').bundle;
var config;

gulp.task('copy-aurelia-build-files', function () {
  return gulp.src([paths.top + 'package.json'])
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('copy-files', ['copy-aurelia-build-files'], function () {
  return gulp.src(paths.output + '**/*')
    .pipe(gulp.dest(paths.tmp + 'app/'));
});

gulp.task('copy-deploy-jspm', function () {
  return gulp.src([
    paths.tmp + 'app/jspm_packages/system.js*'
  ]).pipe(gulp.dest(paths.deploy + 'jspm_packages'));
});

gulp.task('copy-deploy-styles', function () {
  return gulp.src([
    paths.tmp + 'app/styles/*'
  ]).pipe(gulp.dest(paths.deploy + 'styles'));
});

gulp.task('copy-deploy-toolkit', function () {
  return gulp.src([
    paths.tmp + 'app/toolkit/**/*'
  ]).pipe(gulp.dest(paths.deploy + 'toolkit'));
});

gulp.task('build-deploy', ['copy-deploy-styles', 'copy-deploy-jspm', 'copy-deploy-toolkit'], function () {
  return gulp.src([
    paths.tmp + 'app/index.html',
    paths.tmp + 'app/*.js'
  ]).pipe(gulp.dest(paths.deploy));
});

gulp.task('clean-deploy', function () {
  return gulp.src([paths.deploy, paths.tmp])
    .pipe(vinylPaths(del));
});

gulp.task('clean-tmp', function () {
  return gulp.src([paths.tmp])
    .pipe(vinylPaths(del));
});

config = {
  force: true,
  packagePath: './tmp',
  bundles: {
    "app-bundle": {
      includes: [
        'src/**/*',
        'src/**/*.html!text',
        'src/**/*.css!text'
      ],
      options: {
        inject: true,
        minify: true
      }
    },
    "aurelia": {
      includes: [
        'aurelia-bootstrapper',
        'aurelia-router',
        'github:aurelia/templating-binding',
        'github:aurelia/templating-resources',
        'github:aurelia/templating-router',
        'github:aurelia/loader-default',
        'github:aurelia/history-browser',
        'github:aurelia/logging-console',
        'github:aurelia/validation@0.3.0/resources/*'
      ],
      options: {
        inject: true,
        minify: true
      }
    }
  }
};

gulp.task('run-bundler', function () {
  return bundle(config);
});

gulp.task('bundle', function (callback) {
  return runSequence(
    'clean-deploy',
    'build',
    'copy-files',
    'run-bundler',
    'build-deploy',
    'clean-tmp',
    callback
  )
});
