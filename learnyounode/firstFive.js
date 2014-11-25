/*  ANSWER TO LEARNYOUNODE CHALLENGE 5
var fs = require('fs');
var path = require('path');

function mycallback (err, data) {
    if (!err) {
        for (i = 0; i < data.length; i++) { 
            if(path.extname(data[i]) == "." + process.argv[3]) {
                console.log(data[i]);
            }
        }
    }
}

fs.readdir(process.argv[2], mycallback);
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 5
var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + process.argv[3])
      console.log(file)
  })
})
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 4
var fs = require('fs');

function mycallback (err, data) {
    if (!err) {
        numberOfNewLines = data.toString().split('\n').length - 1;
        console.log(numberOfNewLines);
    }
}

fs.readFile(process.argv[2], mycallback);
*/


/*  ANSWER TO LEARNYOUNODE CHALLENGE 3
var fs = require('fs');
var fileContents = fs.readFileSync(process.argv[2]);
var str = fileContents.toString();
var numberOfNewLines = str.split('\n').length - 1;
console.log(numberOfNewLines);
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 2
var arrayOfInputs = process.argv;
var sum = 0;
for (i = 2; i < arrayOfInputs.length; i++) { 
    sum += Number(arrayOfInputs[i]);
}

console.log(sum);
*/
