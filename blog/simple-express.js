var express = require('express');

// we now say express() instead of express.createServer() from node 4.x
var app = express();

// configure has been removed from node 4.x
//app.configure('development', function() {});

// Routes
app.get('/', function(req, res) {
	res.send('Hello World');
});

app.listen(3000);