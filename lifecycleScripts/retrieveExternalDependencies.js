var Promise = require('nodegit-promise');
var promisify = require('promisify-node');
var fse = promisify('fs-extra');
var path = require('path');
var tar = require('tar');
var zlib = require('zlib');
var request = require('request');
var cp = require('child_process');

var local = path.join.bind(path, __dirname);
var rooted = path.join.bind(path, __dirname, '..');

var check = require(local("checkPrepared")).checkVendor;
var pkg = require(rooted('package'));

module.exports = function retrieveExternalDependencies() {
  return Promise.all([
    getVendorLib("libgit2", "https://github.com/libgit2/libgit2/tarball/" + pkg.libgit2.sha),
    getVendorLib("libssh2", pkg.libssh2.url),
    getVendorLib("http_parser", pkg.http_parser.url)
  ]);
};


function getVendorLib(name, url) {
  var vendorPath = rooted("vendor/" + name + "/");
  var version = pkg[name].sha || pkg[name].version;

  console.info("[nodegit] Detecting" + vendorPath + ".");
  return check(name)
    .then(function(exists) {
      if (exists) {
        console.info("[nodegit] " + vendorPath + " already exists.");
        return Promise.resolve();
      }
      else {
        return check(name, true)
          .then(function(exists) {
            if (exists) {
              console.info("[nodegit] Removing outdated " + vendorPath + ".");
              return fse.remove(vendorPath)
            }
            else {
              console.info("[nodegit] " + vendorPath + " not found.");
              return Promise.resolve();
            }
          })
          .then(function() {
            return new Promise(function (resolve, reject) {
              console.info("[nodegit] Retrieving " + vendorPath + ".");

              var extract = tar.Extract({
                path: rooted('vendor/' + name + '/'),
                strip: true
              });

              request.get(url)
                .pipe(zlib.createUnzip())
                .pipe(extract)
                .on("error", reject)
                .on("end", resolve);
            });
          })
          .then(function() {
            return fse.writeFile(vendorPath + version, "");
          })
          .then(function() {
            if ((name == "libssh2") && (process.platform !== "win32")) {
              return new Promise(function(resolve, reject) {
                cp.exec(vendorPath + "configure", {cwd: vendorPath}, function(err, stdout, stderr) {
                  if (err) {
                    reject(err, stderr);
                  }
                  else {
                    resolve(stdout);
                  }
                })
              });
            }
            else {
              return Promise.resolve();
            }
          })
          .then(function() {
            console.info("[nodegit] Successfully updated " + vendorPath + ".");
          });
      }
    });

}

// Called on the command line
if (require.main === module) {
  module.exports();
}
