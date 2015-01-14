var fse = require("fs-extra");
var path = require("path");
var rooted = path.join.bind(path, __dirname, "..");

var toDelete = [
  "build/Makefile",
  "build/binding.Makefile",
  "build/config.gypi",
  "build/gyp-mac-tool",
  "build/nodegit.target.mk",
  "build/vendor",

  "build/Release/git2.a",
  "build/Release/http_parser.a",
  "build/Release/linker.lock",
  "build/Release/obj.target",
  "build/Release/openssl.a",
  "build/Release/ssh2.a",
  "build/Release/zlib.a",

  "build/Debug/git2.a",
  "build/Debug/http_parser.a",
  "build/Debug/linker.lock",
  "build/Debug/obj.target",
  "build/Debug/openssl.a",
  "build/Debug/ssh2.a",
  "build/Debug/zlib.a",

  "example",
  "generate",
  "include",
  "lifecycleScripts",
  "src",
  "test",
  "vendor",

  ".astylerc",
  ".editorconfig",
  ".gitingore",
  ".gitmodules",
  ".jshintrc",
  ".npmignore",
  ".travis.yml",
  "appveyor.yml",
  "binding.gyp"
];

toDelete.forEach(function(deletable) {
  fse.removeSync(rooted(deletable));
});
