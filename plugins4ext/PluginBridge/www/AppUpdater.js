var exec = require('cordova/exec');

exports.coolMethod = function(arg0, success, error) {
    exec(success, error, "AppUpdater", "coolMethod", [arg0]);
};
exports.start = function(arg0, success, error) {
    exec(success, error, "AppUpdater", "start", [arg0]);
};
