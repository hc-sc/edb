var del = require('del');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');


const INCLUDES = ['app/renderer/**/*.js'];
const EXCLUDES = [];

const GLOB = INCLUDES.concat(EXCLUDES);

// make sure the linter doesn't spot any errors
gulp.task('lint', function() {
    return gulp.src(GLOB)
        .pipe(eslint({
            "quiet": true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// deletes any files that will be copied over with 'pack'
gulp.task('clean', function(callback) {
    return del([
        'build/renderer/scripts/',
        'build/renderer/img/',
        'build/renderer/data/',
        'build/renderer/bundle.js',
        'build/package.json'
    ])
    .then(() => console.log('All files cleaned'));
});

// deletes the release dir
gulp.task('clean:release', function() {
    return del(['release'])
    .then(() => console.log('Release dir cleaned'));
})

// cleans everything
gulp.task('clean:full', function() {
    runSequence('clean', 'clean:release');
});

// tdd
gulp.task('tdd', function() {

});

// just bundles
gulp.task('bundle', shell.task(
    'cd app && jspm bundle-sfx app.js ../build/renderer/bundle.js --skip-source-maps --minify --no-mangle'
));

// bundles and produces source-maps
gulp.task('bundle:map', shell.task(
    'cd app && jspm bundle app.js renderer/bundle.js'
));

// transfers resources to the build dir for packaging
gulp.task('pack', function() {
    return Promise.all([
        gulp.src(['app/package.json'])
            .pipe(gulp.dest('build/')),
        gulp.src(['app/renderer/data/**/*.*'])
            .pipe(gulp.dest('build/renderer/data')),
        gulp.src(['app/renderer/img/**/*.*'])
            .pipe(gulp.dest('build/renderer/img')),
        gulp.src(['app/renderer/scripts/**/*.*'])
            .pipe(gulp.dest('build/renderer/scripts')),
        gulp.src(['app/renderer/app.js'])
            .pipe(gulp.dest('build/renderer'))
    ]);
});

gulp.task('dist', shell.task(
    'electron-packager build --platform=win32 --arch=x64 --version=1.2.3 --icon=resources/worldwide_128px_1201435_easyicon.net.ico --out=release --overwrite'
));

// build the executable. NOTE should lint first!
gulp.task('build', function() {
    runSequence('clean', 'pack', 'bundle', 'dist');
});
