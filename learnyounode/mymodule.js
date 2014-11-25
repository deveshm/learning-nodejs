/*  ANSWER TO LEARNYOUNODE CHALLENGE 6 */
var fs = require('fs');
var path = require('path');

var myFunction = function(dirName, ext, callback) {
    var returnList = [];
    fs.readdir(dirName, function(err, list) {
        if (err)
            return callback(err);
        list.forEach(function (file) {
            if (path.extname(file) === '.' + ext)
                returnList.push(file);
        });
        callback(null, returnList);
    });
}


module.exports = myFunction;