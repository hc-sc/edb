var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var Q = require('q');

var clean = function () {
  return del(['build', 'dist']);
};

var compileSCSS = function () {
  return Q.all([gulp.src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))]);
};

var pack = function () {
  return Q.all([
    gulp.src('src/img/**/*.*')
      .pipe(gulp.dest('build/img/')),
    gulp.src(['src/package.build'])
      .pipe(rename('package.json'))
      .pipe(gulp.dest('build')),
    gulp.src(['src/components/**/*.html'])
      .pipe(gulp.dest('build/components')),
    gulp.src(['src/index.js'])
      .pipe(gulp.dest('build')),
    gulp.src(['src/index.html'])
      .pipe(gulp.dest('build')),
    gulp.src(['resources/app/standards/**/*.*'])
      .pipe(gulp.dest('build/standards')),
    gulp.src(['resources/app/templates/**/*.*'])
      .pipe(gulp.dest('build/templates'))
  ]);
};

gulp.task('prebuild', ['clean'], function () {
  return pack();
});

gulp.task('pack', pack);
gulp.watch('src/components/**/*.html', ['pack']);

gulp.task('clean', clean);

gulp.task('sass', function () {
  return compileSCSS();
});

gulp.task('default', function() {});