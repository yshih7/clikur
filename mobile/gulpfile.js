/* jshint node: true, esnext: false*/
var gulp = require("gulp");
var del = require("del");
var paths = require("./build/paths");
var vinylPaths = require("vinyl-paths");
var argv = require("yargs")
    .boolean("release")
    .boolean("major")
    .boolean("minor")
    .boolean("patch")
    .argv;
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var babelOps = require("./build/babel-options.js");
var assign = Object.assign || require('object.assign');
var notify = require("gulp-notify");
//var gulpif = require ("gulp-if");
//var lazypipe = require("lazypipe");
//var zip = require("gulp-zip");
var shell = require("gulp-shell");
//var pgb = require("gulp-phonegap-build");
var bump = require("gulp-bump");
//var replace = require("gulp-replace");
var xmlpoke = require("gulp-xmlpoke");
var mergeStream = require("merge-stream");

//Override gulp.src for error reporting
var _gulpsrc = gulp.src;
gulp.src = function()
{
    return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({
        errorHandler: function(err)
        {
            notify.onError({
                title:    "Gulp Error",
                message:  "Error: <%= error.message %>",
                sound:    "Bottle"
            })(err);
            console.error("Gulp Error: " + err.message);
            this.emit('end');
        }
    }));
};

gulp.task("build-source", function() {
    return gulp.src(paths.source, {base: paths.root})
        .pipe(changed(paths.srcOutput, {extension: ".js"}))
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(babel(assign({}, babelOps, {modules: "system"})))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.srcOutput));
});

gulp.task("build-css", function() {
    return gulp.src(paths.css, {base: paths.root})
        .pipe(changed(paths.srcOutput, {extension: ".css"}))
        .pipe(gulp.dest(paths.srcOutput));
});

gulp.task("build-html", function() {
    return gulp.src(paths.html, {base: paths.root})
        .pipe(changed(paths.srcOutput, {extension: ".html"}))
        .pipe(gulp.dest(paths.srcOutput));
});

gulp.task("copy-res", function() {
    return gulp.src(paths.res, {base: paths.root})
        .pipe(changed(paths.srcOutput))
        .pipe(gulp.dest(paths.srcOutput));
});

gulp.task("build-win", ["build-source", "build-css", "build-html", "copy-res"], function() {
    return gulp.src(paths.root + "config.xml")
        .pipe(gulp.dest(paths.localBuild))
        .pipe(shell([
            "cordova build windows <%= getConfig() %> -- --appx=8.1-phone --buildConfig build.json"
        ], {
            cwd: paths.localBuild,
            templateData : {
                getConfig: function() {
                    return argv.release ? "--release" : "--debug";
                }
            }
        }));
});

gulp.task("build-android", ["build-source", "build-css", "build-html", "copy-res"], function() {
    return gulp.src(paths.root + "config.xml")
        .pipe(gulp.dest(paths.localBuild))
        .pipe(shell([
            "cordova build android <%= getConfig() %>"
        ], {
            cwd: paths.localBuild,
            templateData : {
                getConfig: function() {
                    return argv.release ? "--release" : "--debug";
                }
            }
        }));
});

gulp.task("build-ios", ["build-source", "build-css", "build-html", "copy-res"], function() {
    return gulp.src(paths.root + "config.xml")
        .pipe(gulp.dest(paths.localBuild))
        .pipe(shell([
            "cordova build ios <%= getConfig() %>"
        ], {
            cwd: paths.localBuild,
            templateData : {
                getConfig: function() {
                    return argv.release ? "--release" : "--debug";
                }
            }
        }));
});

gulp.task("clean", function() {
    return gulp.src([paths.srcOutput, paths.remoteArchive])
        .pipe(vinylPaths(del));
});

gulp.task("bump", function()
{
    if (!(argv.major ^ argv.minor ^ argv.patch))
    {
        console.error("Must supply exactly one flag (major|minor|patch) to bump");
        return;
    }
    
    var type = argv.major ? "major" : argv.minor ? "minor" : "patch";
    
    var package = gulp.src("./package.json")
        .pipe(bump({type: type}));
    
    var configXml = gulp.src(paths.root + "config.xml")
        .pipe(xmlpoke({replacements: [
            {
                xpath: "/widget/@version",
                value: function(node)
                {
                    var version = node.value;
                    var verComponents = version.match(/(\d+)\.(\d+)\.(\d+)/);
                    var bumpPos = type === "major" ? 1 : type === "minor" ? 2 : 3;
                    verComponents[bumpPos] = +(verComponents[bumpPos]) + 1;
                    return verComponents.join(".");
                }
            },
            {
                xpath: "/widget/@android-versionCode",
                value: function(node)
                {
                    var code = node.value;
                    return (+code + 1) + "";
                }
            }
        ]}));
    
    return mergeStream(package, configXml);
});
