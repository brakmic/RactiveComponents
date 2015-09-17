/* jshint strict      : false */
//Plugins
var path              = require('path');
var gulp              = require('gulp');

var copy2             = require('gulp-copy2');
var shell             = require('gulp-shell');
var gutil             = require('gulp-util');
var uglify            = require('gulp-uglify');
var buffer            = require('vinyl-buffer');
var sourcemaps        = require('gulp-sourcemaps');
var rename            = require('gulp-rename');
var del               = require('del');
var stripDebug        = require('gulp-strip-debug');
var cache             = require('gulp-cached');
var changed           = require('gulp-changed');
var plumber           = require('gulp-plumber');
var concat            = require('gulp-concat');
var webpack           = require('webpack');
var gWebpack          = require('webpack-stream');
var webpackBuild      = require('gulp-webpack-build');
var WebpackDevServer  = require('webpack-dev-server');
var ts                = require('gulp-typescript');
var merge             = require('merge2');
var msbuild           = require("gulp-msbuild");
var nodemon           = require('nodemon');
var webpackConfig     = require('./webpack.config');
var gulpIgnore        = require('gulp-ignore');
var livereload        = require('gulp-livereload');
var webpackInst       = webpack(webpackConfig);
//Paths
var solutionRoot       = '../';
var vsProjectRoot      = __dirname + '/';
var scriptsRoot        = './scripts/';
var appScriptsRoot     = scriptsRoot + 'app/';
var tsRoot             = appScriptsRoot;
var vendorScriptsRoot  = scriptsRoot + 'vendor/';
var templatesRoot      = appScriptsRoot + 'templates/';
var stylesRoot         = vsProjectRoot + 'styles/';
var htmlRoot           = vsProjectRoot + '**/*.html';
var tsPattern          = tsRoot + '**/*.ts';
var jsPattern          = appScriptsRoot + '**/*.js';
var cssPattern         = stylesRoot + '**/*.css';
var lessPattern        = stylesRoot + '**/*.less';
var sassPattern        = stylesRoot + '**/*.sass';
var htmlPattern        = scriptsRoot + '**/*.html';
var ractPattern        = scriptsRoot + '**/*.ract';
var templatesPattern   = templatesRoot + '**/*.html';
var releaseRoot        = './release/';
var buildRoot          = './build/';
var defsDest           = buildRoot + 'defs/';
var scriptsDest        = releaseRoot;
//******************************
var watchPaths        = [
                          tsPattern,
                          jsPattern,
                          cssPattern,
                          lessPattern,
                          sassPattern,
                          htmlPattern,
                          ractPattern
                        ];
/* Webpack Build Settings */
var webpackDest       = path.resolve(vsProjectRoot);
var webpackOptions    = {
            debug: false,
            devtool: '#source-map',
            watchDelay: 200
        },
    webpackConfig = {
      useMemoryFs: false,
      progress: true
    };

var CONFIG_FILENAME = webpackBuild.config.CONFIG_FILENAME;

gulp.task('webpack', ['copyScripts'], function() {
    return gulp.src(path.join(vsProjectRoot, '**', CONFIG_FILENAME),
                          { base: path.resolve(vsProjectRoot) })
        .pipe(webpackBuild.init(webpackConfig))
        .pipe(webpackBuild.props(webpackOptions))
        .pipe(webpackBuild.run())
        .pipe(webpackBuild.format({
            version: false,
            timings: true
        }))
        .pipe(webpackBuild.failAfter({
            errors: true,
            warnings: true
        }))
        .pipe(gulp.dest(webpackDest));
});

gulp.task('webpack-dev-server', function(callback) {
  var server = new WebpackDevServer(webpack(webpackConfig), {
    hot: true,
    inline: true,
    noInfo: true,
    quiet: true,
    stats: { colors: true }
  });

  server.listen(8080, "localhost", function() {});

  gutil.log('[webpack-dev-server]',
    'http://localhost:8080/webpack-dev-server/build/index.html');

  callback();
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(watchPaths, ['copyScripts']).on('change', function(event) {
        if (event.type === 'changed') {
            gulp.src(event.path, { base: path.resolve(vsProjectRoot) })
                .pipe(webpackBuild.closest(CONFIG_FILENAME))
                .pipe(webpackBuild.init(webpackConfig))
                .pipe(webpackBuild.props(webpackOptions))
                .pipe(webpackBuild.watch(function(err, stats) {
                    gulp.src(this.path, { base: this.base })

                        .pipe(webpackBuild.proxy(err, stats))
                        .pipe(webpackBuild.format({
                            verbose: false,
                            version: false
                        }))
                        .pipe(gulp.dest(webpackDest))
                        .pipe(livereload());
                }));
        }
    });
});

gulp.task('clean', function (cb) {
    del([releaseRoot + '**/*'], function (err, deletedFiles) {
    if(err){
      console.log('Error during deletion: ' + err);
    }
  });
  cb();
});

gulp.task('compress', function() {
  return gulp.src('release/*.js')
    .pipe(uglify({
      mangle: false,
      compress: {
          sequences     : true,  // join consecutive statemets with the “comma operator”
          properties    : true,  // optimize property access: a["foo"] → a.foo
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          unsafe        : false, // some unsafe optimizations (see below)
          conditionals  : true,  // optimize if-s and conditional expressions
          comparisons   : true,  // optimize comparisons
          evaluate      : true,  // evaluate constant expressions
          booleans      : true,  // optimize boolean expressions
          loops         : true,  // optimize loops
          unused        : true,  // drop unused variables/functions
          hoist_funs    : true,  // hoist function declarations
          hoist_vars    : false, // hoist variable declarations
          if_return     : true,  // optimize if-s followed by return/continue
          join_vars     : true,  // join var declarations
          cascade       : true,  // try to cascade `right` into `left` in sequences
          side_effects  : true,  // drop side-effect-free statements
          warnings      : true,  // warn about potentially dangerous optimizations/code
        }
      }))
    .on('error', gutil.log)
    .pipe(gulp.dest('release'));
});

gulp.task('copyScripts', function(){
  return gulp.src([appScriptsRoot + '**/*.*',
                  vendorScriptsRoot + '**/*.*'],
                  {base: path.resolve(__dirname, 'scripts')})
          .pipe(changed(buildRoot))
          .pipe(gulp.dest(buildRoot));
});

gulp.task('run', ['watch'], function() {
  nodemon({
    execMap: {
      js: 'node --harmony'
    },
    script: 'index.js',
    ext: 'noop'
  }).on('restart', function() {
    console.log('restarted!');
  });
});

gulp.task('dev', [
  'webpack-dev-server',
  'webpack'
]);

gulp.task('all', ['clean','webpack']);
gulp.task('default',['all']);