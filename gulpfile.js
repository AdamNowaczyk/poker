// Instructions:
// npm install gulp -g
// npm install
// TODO: https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md

// Load plugins
var gulp = require('gulp'),
  ngAnnotate = require('gulp-ng-annotate'),
  ngHtml2Js = require("gulp-ng-html2js"),
  minifyHtml = require("gulp-minify-html"),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  express = require('express'),
  path = require('path'),
  httpProxy = require('http-proxy');

var paths = {
  dist: 'app/dist',
  templates: ['app/**/*.html', '!app/*.html', '!app/bower_components/**/*', '!app/resources/**/*'],
  scripts: ['app/scripts/poker/**/*.js', 'app/scripts/**/*.js', '!app/bower_components/**/*.js'],
  styles: 'app/resources/styles/**/*.scss',
  images: 'app/resources/images/**/*'
};

// Templates
gulp.task('dev:build:templates', function () {
  return gulp.src(paths.templates)
    .pipe(ngHtml2Js({
      moduleName: 'drConsoleApp',
      declareModule: false
    }))
    .pipe(concat("templates.min.js"))
    .pipe(gulp.dest(paths.dist));
});
gulp.task('prod:build:templates', function () {
  return gulp.src(paths.templates)
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js({
      moduleName: 'drConsoleApp',
      declareModule: false
    }))
    .pipe(concat("templates.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("app/dist"));
});

// Scripts
gulp.task('dev:build:scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat('dist.min.js'))
    .pipe(gulp.dest('app/dist'));
});
gulp.task('prod:build:scripts', function () {
  return gulp.src(paths.scripts)
    //.pipe(sourcemaps.init())
    .pipe(concat('dist.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('app/dist'));
});

// Styles
gulp.task('dev:build:styles', function () {
  return gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('app/dist/css'));
  //return sass('app/resources/styles/')
  //  .pipe(gulp.dest('app/dist/css'));
});

// Images
gulp.task('dev:build:images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('app/dist/images'));
});

gulp.task('dev:run', ['dev:build:templates', 'dev:build:scripts', 'dev:build:styles', 'dev:build:images'], function () {
  var app = express();
  var proxy = new httpProxy.RoutingProxy();
  app.configure(function () {
    //app.use(require('connect-livereload')());
    app.use(express.static(path.join(__dirname, 'app')));
    app.use(express.static(path.join(__dirname, 'serverSide')));
    app.use(express.bodyParser());
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
  });

  app.all('/ws/v1.0/jsonrpc', function (req, res) {
    var response = proxy.proxyRequest(req, res, {
      host: '10.250.243.69', // adamn-01
      //host: '10.250.243.103', // adamn-02
      //host: '10.250.242.7', // steveb-03
      //host: '10.250.242.6', // steveb-03
      //host: '10.250.235.107', // DR6000-17
      port: 80
    });
    return response;
  });

  app.listen(3000, function () {
    console.log('Express server listening on port 3000');
  });

  gulp.watch(paths.templates, {interval: 500}, ['dev:build:templates']);
  gulp.watch(paths.scripts, {interval: 500}, ['dev:build:scripts']);
  gulp.watch(paths.styles, {interval: 500}, ['dev:build:styles']);
  gulp.watch(paths.images, {interval: 500}, ['dev:build:images']);
});
