/*
http://www.nodebeginner.org/#javascript-and-nodejs
*/
var http = require("http");

/*
http.createServer
(
	function(request, response)
	 {
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write("Hello World");
	  response.end();
	}
).listen(8888);
*/
function onRequest(request, response)
	 {
	  response.writeHead(200, {"Content-Type": "text/plain"});
	  response.write("Hello World");
	  response.end();
	}

http.createServer(onRequest).listen(8888);