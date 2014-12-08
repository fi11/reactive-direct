var gulp = require('gulp');
var shell = require('gulp-shell');
var nodemon = require('gulp-nodemon');
var env = {
    DEBUG: 'info',
    NODE_ENV: 'development'
};

gulp.task('webpack', shell.task('./node_modules/webpack/bin/webpack.js --progress'));
gulp.task('ww', shell.task('./node_modules/webpack/bin/webpack.js --watch'));

gulp.task('watch-server', ['webpack'],function () {
  nodemon({
      script: 'server/worker.js',
      watch: ['server/', 'public/static/*'],
      ext: 'js json',
      nodeArgs: ['--harmony-generators'],
      env: env,
      stdout: true,
      stderr: true
  });
});

gulp.task('default', ['watch-server']);
