var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var Q = require('q');
var browserSync = require('browser-sync').create();
var childProcess = require('child_process');
var electron;

const WATCH_GLOB_RELOAD = ['./src/**/**.**', '!./src/scss/**/*.*', '!./src/*.*'];
const WATCH_GLOB_RESTART = ['./src/index.html', './src/index.js', './src/jspm.config.js'];

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
    gulp.src(GLOB_INCLUDE)
      .pipe(gulp.dest('build')),
    gulp.src(['src/package.build'])
      .pipe(rename('package.json'))
      .pipe(gulp.dest('build')),
    gulp.src(['src/components/**/*.html'])
      .pipe(gulp.dest('build/components')),
    gulp.src(['src/index.prod.js'])
      .pipe(rename('index.js'))
      .pipe(gulp.dest('build')),
    gulp.src('src/index.prod.html')
      .pipe(rename('index.html'))
      .pipe(gulp.dest('build'))
  ]);
};

gulp.task('sass', function () {
  return compileSCSS();
});

gulp.task('default', ['sass'], function () {
  electron = require('electron-prebuilt');
  childProcess.spawn(electron, ['./src/index.prod.js'], { stdio: 'inherit' });
});

gulp.task('server', ['sass'], function () {
  browserSync.init([
    './src/+(components|scss|img)/**/**.+(js|html|scss)',
    './src/index.html'
  ], {
      server: './src/'
    });

  gulp.watch('./src/scss/**/**.**', ['sass']);
});

gulp.task('dev', ['sass'], function () {
  electron = require('electron-connect').server.create({ 'port': 2000 });
  electron.start();
  gulp.watch('./src/scss/**/*.*', ['sass']);
  gulp.watch(WATCH_GLOB_RELOAD, electron.reload);
  gulp.watch(WATCH_GLOB_RESTART, electron.restart);
});

gulp.task('prebuild', ['clean'], function () {
  return compileSCSS().then(pack);
});

gulp.task('clean', clean);

