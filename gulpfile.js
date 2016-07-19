'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel')
const concat = require('gulp-concat');
const del = require('del');
const ngAnnotate = require('gulp-ng-annotate');
const nodemon = require('gulp-nodemon');
const plumber = require('gulp-plumber');
const pump = require('pump')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint'); 

var BROWSER_SYNC_RELOAD_DELAY = 500;

// can be ./ but not / at begining
let paths = {
  html:{
    input: 'client/html/**/*.html',
    output: 'public/html'
  },
  js : {
    input: 'client/js/**/*.js',
    output: 'public/js'
  },
  css : {
    input: ['client/css/**/*.scss', 'client/css/**/*.sass'],
    output: 'public/css'
  },
  favicon : {
    input: 'client/favicon.ico',
    output: 'public'
  } 
}

gulp.task('watch:lint', ['lint'], function(){
  return gulp.watch(['**/*.js', '!node_modules/**', '!public/**'])
})

gulp.task('lint', function(){
  return gulp.src(['**/*.js', '!node_modules/**', '!public/**'])
    .pipe(eslint())
    .pipe(eslint.format())
});

gulp.task('default', ['build', 'watch', 'browser-sync']);

//tell heroku to run build but not watch
gulp.task('build', ['html', 'css', 'js', 'favicon']);
gulp.task('watch',['watch:html', 'watch:css', 'watch:js']);

//for gulp to run 
/*gulp.task('serve', function(){
  //server wont restart if these files are changed
  nodemon({
    ignore: ['./client' ,'./public']
  });
})*/

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    watch: ['app.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

///////////////////// HTML //////////////////////
gulp.task('html', ['clean:html'], function(){
  return gulp.src(paths.html.input)
    .pipe(gulp.dest(paths.html.output))
});

gulp.task('clean:html', function(){
  return del([paths.html.output]);
});

gulp.task('watch:html', function(){
  gulp.watch(paths.html.input, ['html', 'bs-reload']);
})

/////////////////// JS /////////////////////////
gulp.task('js', ['clean:js'], function(){
  return gulp.src(paths.js.input)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel({
       presets: ['es2015']
     }))
    .pipe(ngAnnotate())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())    
    .pipe(gulp.dest(paths.js.output))
});

gulp.task('clean:js', function(){
  return del([paths.js.output]);
});

gulp.task('watch:js', function(){
  gulp.watch(paths.js.input, ['js', browserSync.reload]);
})

///////////////////// CSS //////////////////////
gulp.task('css', ['clean:css'], function(){
  return gulp.src(paths.css.input)
  .pipe(plumber())
  .pipe(sass())
  .pipe(browserSync.reload({ stream: true }))
  .pipe(gulp.dest(paths.css.output))
});

gulp.task('clean:css', function(){
  return del([paths.css.output]);
});

gulp.task('watch:css', function(){
  gulp.watch(paths.css.input, ['css']);
})

gulp.task('favicon', function(){
  return gulp.src(paths.favicon.input)
  .pipe(plumber())
  .pipe(gulp.dest(paths.favicon.output));
})

gulp.task('browser-sync', ['nodemon'], function () {

  browserSync({
    proxy: 'http://localhost:8000',
    port: 4000,
    browser: ['google-chrome']
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});






















