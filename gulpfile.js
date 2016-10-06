const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');

const package = require('./package');
const config = package.jshintConfig;


const jsFiles = ['*.js', 'src/**/*.js'];
gulp.task('style', () => {
  return gulp.src(jsFiles)
             .pipe(jshint(config))
             .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
             .pipe(jscs());
});
