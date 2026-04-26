const express = require('express');
const { createBareServer } = require('bare-server-node');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const http = require('http');
const path = require('path');

const app = express();
const bare = createBareServer('/bare/');

app.use('/uv/', express.static(uvPath));
app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer();

server.on('request', (req, res) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else app(req, res);
});

server.on('upgrade', (req, socket, head) => {
  if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

server.listen(process.env.PORT || 3000);

{
  "name": "uv-proxy",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "bare-server-node": "^2.0.0",
    "@titaniumnetwork-dev/ultraviolet": "^3.2.7"
  }
}
