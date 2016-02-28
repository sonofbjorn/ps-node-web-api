var http = require('http');
var express = require('express');

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello world\n');
}).listen(3000, '127.0.0.1'); 

console.log('Server running at http://127.0.0.1:3000/');