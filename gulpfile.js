'use strict';
 
var gulp            = require('gulp'),
    babel           = require('gulp-babel'),
    sass            = require('gulp-sass'),
    cssnano         = require('gulp-cssnano'),
    sourcemaps      = require('gulp-sourcemaps'),
    imagemin        = require('gulp-imagemin'),
    autoprefixer    = require('gulp-autoprefixer');
 
gulp.task('babel', () =>
    gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/js/'))
);

gulp.task('workflow', function () {
  gulp.src('./src/stylesheets/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('copyfonts', () =>
gulp.src('./src/assets/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./public/assets/fonts')))
 
gulp.task('moveFavicon', () =>
gulp.src('src/favicon/**.*')
    .pipe(gulp.dest('public/favicon/'))
);

gulp.task('imagemin', () => {
    gulp.src('./src/assets/images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./public/assets/images'))
});

gulp.task('moveJSVendor', () => {
    gulp.src('src/js-vendor/require.js')
      .pipe(gulp.dest('public/js'));
    gulp.src('src/js-vendor/socket.io.js')
      .pipe(gulp.dest('public/'));
  }
);

gulp.task('moveAudio', () => {
    gulp.src('src/assets/audio/*')
      .pipe(gulp.dest('public/assets/audio'));
  }
);

gulp.task('default', ['workflow', 'babel', 'copyfonts', 'moveFavicon', 'imagemin', 'moveJSVendor', 'moveAudio'], function () {
  gulp.watch('src/stylesheets/**/*.scss', ['workflow']);
  gulp.watch('./src/js/**/*.js', ['babel']);
});
