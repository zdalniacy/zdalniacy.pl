'use strict';

var gulp = require('gulp');
var log = require('gulp-util').log;

var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');


var codeFiles = [
  'server/**/*.js', 
  '!public/vendor/**/*.js', 
  'public/**/*.js',
  'test/**/*.js'
];

var backendFiles = ['server/**/*.js'];
var testFiles = ['test/**/*.js'];

gulp.task('lint', function() {
  log('Linting Files');
  return gulp.src(codeFiles)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter());
});

gulp.task('test_backend', function(){
  log("Running tests");
  return gulp.src(testFiles)
    .pipe(mocha({reporter: 'spec'}));
  
});

gulp.task('watch', function() {
  log('Watching Files');
  gulp.watch(codeFiles, ['lint']);
  gulp.watch(backendFiles, ['test_backend','lint']);
  gulp.watch(testFiles, ['test_backend','lint']);
});

gulp.task('watch_backend', function() {
  log('Watching Backends Files');
  gulp.watch(backendFiles, ['test_backend']);
  gulp.watch(testFiles, ['test_backend']);
});

gulp.task('default', ['lint', 'watch']);
