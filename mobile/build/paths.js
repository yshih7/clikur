/*jshint node: true, esnext: false*/

var srcRoot = "www/";
var outputRoot = "build/";

module.exports = {
    root: srcRoot,
    source: [srcRoot + "*.js", srcRoot + "views/*.js"],
    html: srcRoot + "**/*.html",
    css: srcRoot + "**/*.html",
    masterOutput: outputRoot,
    localOutput: outputRoot + "local/www/",
    localBuild: outputRoot + "local/",
    remoteOutput: outputRoot + "remote/"
};
