var path = require('path');
var appRoot = 'app/';
var outputRoot = 'dist/';
var tmp = 'tmp/';
var deployRoot = 'deploy/';
var topRoot = './';

module.exports = {
  top: topRoot,
  root: appRoot,
  source: [appRoot + '**/*.js', '!**/jspm_packages/**', '!**/config.js', '!**/toolkit/**'],
  deploy: deployRoot,
  tmp: tmp,
  html: appRoot + '**/*.html',
  style: 'styles/**/*.css',
  less: appRoot + '**/*.less',
  output: outputRoot,
  doc:'./doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
