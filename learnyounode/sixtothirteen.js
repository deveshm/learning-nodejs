/*
Test challenge 13 by running the node server (node sixtothirteen.js) and then visiting the following address:
http://localhost/api/unixtime?iso=2013-08-10T12:10:15.474Z
http://localhost/api/parsetime?iso=2013-08-10T12:10:15.474Z
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 13
var httpModule = require('http');
var urlModule = require('url');

function myCallback (request, response) {
    // this callback is called for every connection created
    var urlParsed = urlModule.parse(request.url, true);
    var dateFromQuery = urlParsed.query.iso;

    if (urlParsed.pathname == '/api/parsetime') {
        var timeFromDate = new Date(dateFromQuery);
        var jsonObject = {"hour" : timeFromDate.getHours(), "minute" : timeFromDate.getMinutes(), "second" : timeFromDate.getSeconds()};
        response.write(JSON.stringify(jsonObject));
        response.end();
    } else if (urlParsed.pathname == '/api/unixtime') {
        var timeFromDaoiUte = new Date(dateFromQuery).getTime();
        var jsonObject = {"unixtime" : timeFromDate};
        response.write(JSON.stringify(jsonObject));
        // you need response.end to finish and send the response!!!
        response.end();
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
};

var server = httpModule.createServer(myCallback);
server.listen(process.argv[2]);
*/


/* SHORTHAND ANSWER TO LEARNYOUNODE CHALLENGE 13
    var http = require('http')
    var url = require('url')
    
    function parsetime (time) {
      return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
      }
    }
    
    function unixtime (time) {
      return { unixtime : time.getTime() }
    }
    
    var server = http.createServer(function (req, res) {
      var parsedUrl = url.parse(req.url, true)
      var time = new Date(parsedUrl.query.iso)
      var result
    
      // this version of the code uses reg exps rather than string ==
      if (/^\/api\/parsetime/.test(req.url))
        result = parsetime(time)
      else if (/^\/api\/unixtime/.test(req.url))
        result = unixtime(time)
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })
    server.listen(Number(process.argv[2]))
*/



/*  ANSWER TO LEARNYOUNODE CHALLENGE 12
var httpModule = require('http');
var map = require('through2-map');

function myCallback (request, response) {
    // this callback is called for every connection created
    // check if the request method was POST
    if (request.method != 'POST')
        return response.end('send me a POST\n')

    // in the response, we will write the http status of 200 (OK) and the content type of text/plain
    response.writeHead(200, { 'content-type': 'text/plain' });
    
    request.pipe(map(function (chunk) {
        var chunkArray = chunk.toString().split('');
        for (index = 0; index < chunkArray.length; index++) {
            chunkArray[index] = chunkArray[index].toUpperCase();
        };
        return chunkArray.join('');
    })).pipe(response);
};

var server = httpModule.createServer(myCallback);
server.listen(process.argv[2]);
*/


/* SHORTHAND ANSWER TO LEARNYOUNODE CHALLENGE 12
    var http = require('http')
    var map = require('through2-map')
    
    var server = http.createServer(function (req, res) {
      if (req.method != 'POST')
        return res.end('send me a POST\n')
    
      req.pipe(map(function (chunk) {
        return chunk.toString().toUpperCase()
      })).pipe(res)
    })
    
    server.listen(Number(process.argv[2]))
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 11
var httpModule = require('http');
var fsModule = require('fs');

function myCallback (request, response) {
    // this callback is called for every connection created 
    // in the response, we will write the http status of 200 (OK) and the content type of text/plain
    response.writeHead(200, { 'content-type': 'text/plain' });
    // createReadStream creates a stream object, which we can pipe to another stream
    var file = fsModule.createReadStream(process.argv[3]);
    // pipe a file system stream to a http stream
    file.pipe(response);
};

var server = httpModule.createServer(myCallback);
server.listen(process.argv[2]);
*/



/*  ANSWER TO LEARNYOUNODE CHALLENGE 10
var netModule = require('net');

function myCallback (socket) {
    var date = new Date();
    var month = date.getMonth() + 1;
    month = ("0" + month).slice(-2);
    var day = date.getDate();
    day = ("0" + day).slice(-2);
    var dateString = date.getFullYear() + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes();
    // write data to socket and close the socket
    socket.end(dateString + '\n');
};

// create the server and start listening on the port specified in the CLA
var server = netModule.createServer(myCallback);
server.listen(process.argv[2]);
*/



/*  ANSWER TO LEARNYOUNODE CHALLENGE 9
var httpModule = require('http');
var bl = require('bl'); 
var results =  [];
var count = 0;

function queueRequest(index) {
    httpModule.get(process.argv[2 + index], function (response) {
        // notice that the response is piped to the bl function
        response.pipe(bl(function (err, data) {
            if (err)
              return console.error(err)
            
            // note: index is from outside this callback function
            results[index] = data.toString();
            count++;
            
            // below, I cannot check if results.length == 3
            // this is because results may have the third element created first
            if (count == 3) {
                for (var i = 0; i < 3; i++)
                    console.log(results[i])
            }
        }))  
    })
}

for (var i = 0; i < 3; i++)
    queueRequest(i)

*/


/*  ANSWER TO LEARNYOUNODE CHALLENGE 8
var httpModule = require('http');
var totalString = "";

var myCallback = function (response) {
    // data is a Node STREAM object, which emits events e.g. the data event
    response.on("data", function(dataReturned) {
        // this function is called when a chunk of data is ready to be processed
        totalString += dataReturned.toString();
    });

    response.on("end", function() {
        console.log(totalString.length);
        console.log(totalString);
    });
};

httpModule.get(process.argv[2], myCallback);
*/


/* SHORTHAND ANSWER TO LEARNYOUNODE CHALLENGE 8
    var http = require('http')
    // the buffer list module allows us to collect an entire stream of data easily
    var bl = require('bl')
    
    http.get(process.argv[2], function (response) {
        // notice that the response is piped to the bl function
      response.pipe(bl(function (err, data) {
        if (err)
          return console.error(err)
        data = data.toString()
        console.log(data.length)
        console.log(data)
      }))  
    })
*/

/*  ANSWER TO LEARNYOUNODE CHALLENGE 7
var httpModule = require('http');

var myCallback = function (response) {
    // response is a Node STREAM object, which emits events e.g. the data event
    // the .on method means that you are now listening to the "data" event
    response.on("data", function(dataReturned) {
        // this function is called when a chunk of data is ready to be processed
        console.log(dataReturned.toString());
    });
};

httpModule.get(process.argv[2], myCallback);
*/


/* SHORTHAND ANSWER TO LEARNYOUNODE CHALLENGE 7
    var http = require('http')
    
    http.get(process.argv[2], function (response) {
      response.setEncoding('utf8')
      // the second parameter to response.on() is a function
      response.on('data', console.log)
      response.on('error', console.error)
    })
*/



/*  ANSWER TO LEARNYOUNODE CHALLENGE 6
// local modules must be prefixed with a ./
var myModule = require('./mymodule.js');

myModule(process.argv[2], process.argv[3], 
    function(err, data) {
        if (!err) {
            data.forEach(function (obj) {
                console.log(obj);
            });
        }
    }
);
*/