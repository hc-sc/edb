var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var jspm = require('gulp-jspm');
var rename = require('gulp-rename');
var Q = require('q');

const INCLUDES = ['app/renderer/**/*.js'];
const EXCLUDES = [];

const GLOB = INCLUDES.concat(EXCLUDES);

var bundle = function() {
    return gulp.src('app/renderer/app.js')
        .pipe(jspm({
            selfExecutingBundle: true,
            minify: true,
            mangle: false,
            skipSourceMaps: true
        }))
        .pipe(gulp.dest('build/renderer/'));
};

var clean = function() {
    return del(['build', 'dist']);
};

var pack = function() {
    return Q.all([
        gulp.src(['app/package.json'])
            .pipe(gulp.dest('build')),
        gulp.src(['app/renderer/data/**/*.*'])
            .pipe(gulp.dest('build/renderer/data')),
        gulp.src(['app/renderer/projects/**/*.*'])
            .pipe(gulp.dest('build/projects')),
        gulp.src(['app/renderer/img/**/*.*'])
            .pipe(gulp.dest('build/renderer/img')),
        gulp.src(['app/renderer/scripts/**/*.html'])
            .pipe(gulp.dest('build/renderer/scripts')),
        gulp.src(['app/main/**/*.js'])
            .pipe(gulp.dest('build/main')),
        gulp.src('app/renderer/index.html.bundled')
            .pipe(rename('index.html'))
            .pipe(gulp.dest('build/renderer'))
    ]);
};

// make sure the linter doesn't spot any errors
gulp.task('lint', function() {
    return gulp.src(GLOB)
        .pipe(eslint({
            "quiet": true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// cleans everything
gulp.task('clean', ['lint'], clean);

gulp.task('clean:no-lint', clean);

gulp.task('bundle', ['pack'], bundle);

gulp.task('bundle:no-lint', ['pack:no-lint'], bundle);

// transfers resources to the build dir for packaging
gulp.task('pack', ['clean'], pack);

gulp.task('pack:no-lint', ['clean:no-lint'], pack);