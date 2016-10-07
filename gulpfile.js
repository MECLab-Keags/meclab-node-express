const gulp = require('gulp');
const jshint = require('gulp-jshint');
const jscs = require('gulp-jscs');
const livereload = require('gulp-livereload');
const server = require('gulp-develop-server');

const package = require('./package');
const config = package.jshintConfig;
const jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', () => {
  return gulp.src(jsFiles)
             .pipe(jshint(config))
             .pipe(jshint.reporter('jshint-stylish', { verbose: true }))
             .pipe(jscs());
});

gulp.task('inject', () => {
  const wiredep = require('wiredep').stream;
  const options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  const inject = require('gulp-inject');
  const injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read:false});
  const injectOpt = {ignorePath: '/public'};

  return gulp.src('./src/views/*.ejs')
             .pipe(wiredep(options))
             .pipe(inject(injectSrc, injectOpt))
             .pipe(gulp.dest('./src/views'));
});

gulp.task('server:start', () => {
  const options = {
    path: './app.js',
    delay: 600,
    env: { 'PORT': 3000 }
  };
  server.listen(options, livereload.listen);
});

gulp.task('watch', ['server:start'], () => {
  const js = ['*.js', './public/**/*.js', './public/*.js'];
  const views = ['./src/views/*.ejs'];
  const css = ['./public/css/*.css'];
  gulp.watch(views, ['inject']);

  gulp.watch(js.concat(views).concat(css)).on('change', file => {
    server.changed(err => {
      if(err){
        console.error(err);
        return;
      }

      console.log('file changed: ' + file.path);
      livereload.changed(file.path);
    });
  });
});

gulp.task('default', ['style', 'inject', 'watch']);
