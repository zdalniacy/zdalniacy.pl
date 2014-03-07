'use strict';

var gulp = require('gulp');
var log = require('gulp-util').log;

var jshint = require('gulp-jshint');

var codeFiles = ['server/**/*.js', '!node_modules/**', 
                 '!public/vendor/**/*.js', 'public/**/*.js'];

gulp.task('lint', function() {
  log('Linting Files');
  return gulp.src(codeFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

gulp.task('watch', function() {
  log('Watching Files');
  gulp.watch(codeFiles, ['lint']);
});

