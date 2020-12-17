'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');
const runSequence = require('run-sequence');
const flatten = require('gulp-flatten');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('app/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(flatten())
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

// Watchers
gulp.task('watch', function () {
  gulp.watch('app/**/*.scss', [ 'sass' ]);
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/**/*.js', browserSync.reload);
});

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function () {

  return gulp.src([ 'app/**/*.html', '!app/lib/**/*' ])
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function () {
  return gulp.src('app/assets/**/*.+(png|jpg|jpeg|gif)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({ interlaced: true })))
    .pipe(gulp.dest('dist/assets'));
});

// Copying other important files
gulp.task('files', function () {
  return gulp.src([ '.htaccess' ])
    .pipe(gulp.dest('dist'));
});
// Copying fonts
// gulp.task('fonts', function () {
//   return gulp.src('app/lib/font-awesome/fonts/*.+(otf|eot|svg|ttf|woff|woff2)')
//     .pipe(gulp.dest('dist/fonts'));
// });

// Cleaning
gulp.task('clean', function () {
  return del.sync('dist').then(function (cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function () {
  return del.sync([ 'dist/**/*', '!dist/assets' ]);
});

// Build Sequences
// ---------------

gulp.task('default', function (callback) {
  runSequence([ 'sass', 'browserSync' ], 'watch', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', [ 'useref', 'images', 'files' ], callback);
});
