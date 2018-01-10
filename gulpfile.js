var scriptSource      = 'js/src/';
var scriptDestination = 'js/dist/';
var cssSource         = 'css/src/';
var cssDestination    = 'css/dist/';
var htmlSource        = ['index.html'];
var htmlDestination   = './';

var gulp              = require('gulp');
var autoprefixer      = require('autoprefixer');
var browserSync       = require('browser-sync');
var concat            = require('gulp-concat');
var cp                = require('child_process');
var htmlhint          = require("gulp-htmlhint");
var jshint            = require('gulp-jshint');
var merge             = require('merge-stream');
var postcss           = require('gulp-postcss');
var rename            = require('gulp-rename');
var sass              = require('gulp-sass');
var sasslint          = require('gulp-sass-lint');
var sourcemaps        = require('gulp-sourcemaps');
var uglify            = require('gulp-uglify');

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('build', ['css', 'js']);
gulp.task('css', ['sass', 'sasslint']);
gulp.task('js', ['jshint', 'scripts']);
gulp.task('lint', ['jshint', 'sasslint', 'htmllint']);

gulp.task('watch', function () {
  gulp.watch(scriptSource + '**/*.js', ['js']);
  gulp.watch(cssSource + '**/*.scss', ['css']);
});

gulp.task('browser-sync', ['build'], function() {
  browserSync({
    server: {baseDir: htmlDestination},
    host: '127.0.0.1',
    port: 4000
  });
});

gulp.task('sass', function () {
  return gulp.src(cssSource + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(cssDestination))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  gulp.src(scriptSource + '**/*.js')
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(scriptDestination))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(scriptDestination))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('sasslint', function () {
  return gulp.src([cssSource + '**/*.scss', '!' + cssSource + 'vendor/**/*.scss'])
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('jshint', function() {
  return gulp.src([scriptSource + '*', 'gulpfile.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('htmllint', function() {
  return gulp.src([htmlDestination + '**/*.html'])
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});
