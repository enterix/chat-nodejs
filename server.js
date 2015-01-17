//
// # SimpleServer
//
// A simple chat server using node.js
//
var http = require('http');
var router = require('router');
require('./router_setup');


var server = http.createServer(router.forward);

server.listen(process.env.PORT, process.env.IP);