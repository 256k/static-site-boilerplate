var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

// browser-sync task for starting the server.

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dev"
    }
  });
});

// gulp tasks for prodction build

gulp.task('sass-prod', function() {
  return gulp.src('./dev/sass/*.scss')
  .pipe(sass({
    includePaths: './node_modules/bootstrap-sass/assets/stylesheets'
  }))
  .pipe(autoprefixer())
  .pipe(rename('style.css'))
  .pipe(gulp.dest('./dist'))
});

// moving files to dist folder

gulp.task('dist-html-files', function(){
  return gulp.src('./dev/*.html')
  .pipe(gulp.dest('./dist'))
})

gulp.task('dist-asset-files', function(){
  return gulp.src('./dev/assets/*.*')
  .pipe(gulp.dest('./dist/assets'))
})

gulp.task('dist-script-files', function() {
  gulp.src('./dev/js/*.js')
  .pipe(gulp.dest('./dist/js'))
});

// gulp production build

gulp.task('build', [
  'sass-prod',
  'dist-asset-files',
  'dist-html-files',
  'dist-script-files'
]);




//  ============================================== //

// gulp dev tasks

gulp.task('sass', function() {
    return gulp.src('./dev/sass/*.scss')
    .pipe(sass({style: 'compressed', includePaths: './node_modules/bootstrap-sass/assets/stylesheets'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dev'))
    .pipe(reload({stream: true}));
});

// Default task to be run with `gulp`

gulp.task('default', [
    'sass', 'browser-sync'
], function() {
    gulp.watch("./dev/*.html").on("change", reload);
    gulp.watch("./dev/sass/**/*.scss", ['sass']);
    gulp.watch("./dev/js/**/*.js").on('change', reload);

});
