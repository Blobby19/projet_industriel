/**
 * Created by Luc on 04/04/2016.
 */


var gulp = require('gulp');
var jshint = require('gulp-jshint');
var del = require('del');
var mocha = require('gulp-mocha');
var bunyan = require('bunyan');

var paths = {
    scripts: ['tests/**/*.js', 'assets/**/*.js', 'index.js', './server.js', 'client/app/**/*.js']
};

gulp.task('clean', function(){
    return del(['build']);
});

gulp.task('app-jshint', function(){
    return gulp.src(paths.appScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function(){
    return gulp.src('tests/**/*.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['mocha']);
});

gulp.task('default', ['clean', 'scripts']);
