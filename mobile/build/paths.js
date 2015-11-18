/*jshint node: true, esnext: false*/

var srcRoot = "www/";
var outputRoot = "build/dest/";

module.exports = {
    root: srcRoot,
    source: [srcRoot + "*.js", "!" + srcRoot + "config.js", srcRoot + "view-models/*.js", srcRoot + "js/*.js", "!" + srcRoot + "js/winstore-jscompat.js"],
    html: [srcRoot + "**/*.html", "!" + srcRoot + "jspm_packages/**"],
    css: [srcRoot + "**/*.css", "!" + srcRoot + "jspm_packages/**"],
    res: [srcRoot + "img/**", srcRoot + "res/**", srcRoot + "jspm_packages/**/*.js", srcRoot + "js/winstore-jscompat.js", srcRoot + "config.js", srcRoot + "**/*.woff", srcRoot + "**/*.woff2"],
    destRoot: outputRoot,
    srcOutput: outputRoot + "www/",
    localBuild: outputRoot
};
