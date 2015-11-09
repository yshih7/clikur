/*jshint node: true, esnext: false*/

var srcRoot = "www/";
var outputRoot = "build/dest/";

module.exports = {
    root: srcRoot,
    source: [srcRoot + "*.js", srcRoot + "views/*.js", srcRoot + "js/*.js", "!" + srcRoot + "winstore-jscompat.js"],
    html: srcRoot + "**/*.html",
    css: srcRoot + "**/*.css",
    res: [srcRoot + "img/**", srcRoot + "res/**", srcRoot + "jspm_packages/**/!*.ts", srcRoot + "js/winstore-jscompat.js"],
    destRoot: outputRoot,
    srcOutput: outputRoot + "www/",
    localBuild: outputRoot,
    remoteArchive: outputRoot + "remote/",
    remotePackage: outputRoot + "remote/package/",
};
