var http = require('http');
var url = require('url');
var port = 8888;


function start(route) {
    http.createServer(function(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(pathname);

        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Hello World!");
        res.end();
        
    }).listen(port);
    console.log("Server has started on port " + port + ".");
}

exports.start = start;