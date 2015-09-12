var gulp = require('gulp');
var karma = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: false
  }, function (e) {
    done();
  });
});


gulp.task('test-chrome', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    browsers: ['Chrome'],
    singleRun: false
  }, function (e) {
    done();
  });
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: false,
    autoWatch: true
  }, function (e) {
    done();
  });
});

/**
 * Run test once with code coverage and exit
 */
gulp.task('cover', function (done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    preprocessors: {
      'test/unit/**/*.spec.js': ['babel', 'sourcemap'],
      'src/**/!(main)*.js': ['babel', 'sourcemap', 'coverage']
    },
    reporters: ['coverage', 'spec']
  }, function (e) {
    done();
  });
});


