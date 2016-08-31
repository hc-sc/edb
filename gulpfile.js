var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var Q = require('q');
var browserSync = require('browser-sync').create();
var childProcess = require('child_process');
var electron;
var webpack = require('webpack');

const WATCH_GLOB_RELOAD = ['./build/components/**/*.*', './build/app.js', './build/img/**/*.*'];
const WATCH_GLOB_RESTART = ['./build/index.html', './build/index.js'];

const GLOB_INCLUDE = WATCH_GLOB_RELOAD.concat(['!./src/jspm_packages/**/*.*', '!./src/components/**/*.*']);

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
      .pipe(gulp.dest('build'))
  ]);
};

gulp.task('prebuild', ['clean'], function () {
  return pack();
});

gulp.task('pack', pack);

gulp.task('clean', clean);

gulp.task('sass', function () {
  return compileSCSS();
});

gulp.task('default', function() {});

// gulp.task('default', ['sass'], function () {
//   electron = require('electron-prebuilt');
//   childProcess.spawn(electron, ['./src/index.prod.js'], { stdio: 'inherit' });
// });

// gulp.task('server', ['sass'], function () {
//   browserSync.init([
//     './src/+(components|scss|img)/**/**.+(js|html|scss)',
//     './src/index.html'
//   ], {
//       server: './src/'
//     });

//   gulp.watch('./src/scss/**/**.**', ['sass']);
// });

gulp.task('dev', function () {
  electron = require('electron-connect').server.create({ 'port': 2000 });
  electron.start();
  gulp.watch(WATCH_GLOB_RELOAD, electron.reload);
  gulp.watch(WATCH_GLOB_RESTART, electron.restart);
});