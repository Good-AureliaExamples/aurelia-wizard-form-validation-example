var gulp = require('gulp');
var browserSync = require('browser-sync');
var modRewrite = require('connect-modrewrite');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000

gulp.task('serve', ['build'], function (done) {
  browserSync({
    open: true,
    port: 9000,
    startPath: "/myapp/mypath/something/index.html",
    server: {
      baseDir: ['./dist'],
      directory: true,
      middleware: [
        modRewrite([
          '^/myapp/mypath/something/(.*)$ /$1'
        ]),
        function (req, res, next) {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }]
    }
  }, done);
});

gulp.task('serve-bundled', ['build-bundle'], function (done) {
  browserSync({
    open: true,
    port: 9001,
    server: {
      baseDir: ['./deploy'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});
