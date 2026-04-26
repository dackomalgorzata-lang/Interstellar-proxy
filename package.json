// Railway-ready Ultraviolet Proxy // Structure: // package.json // index.js // static/index.html

// package.json { "name": "uv-railway", "version": "1.0.0", "main": "index.js", "scripts": { "start": "node index.js" }, "dependencies": { "express": "^4.18.2", "bare-server-node": "^2.0.0", "@titaniumnetwork-dev/ultraviolet": "latest" } }

// index.js const express = require('express'); const { createBareServer } = require('bare-server-node'); const { uvPath } = require('@titaniumnetwork-dev/ultraviolet'); const http = require('http'); const path = require('path');

const app = express(); const bare = createBareServer('/bare/');

app.use('/uv/', express.static(uvPath)); app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer();

server.on('request', (req, res) => { if (bare.shouldRoute(req)) { bare.routeRequest(req, res); } else { app(req, res); } });

server.on('upgrade', (req, socket, head) => { if (bare.shouldRoute(req)) { bare.routeUpgrade(req, socket, head); } else { socket.end(); } });

const port = process.env.PORT || 3000; server.listen(port, () => { console.log(Server running on port ${port}); });

// static/index.html

<!DOCTYPE html><html>
<head>
  <meta charset="UTF-8">
  <title>Ultraviolet Proxy</title>
  <script src="/uv/uv.bundle.js"></script>
  <script src="/uv/uv.config.js"></script>
</head>
<body>
  <h2>Ultraviolet Proxy</h2>
  <input id="url" placeholder="https://example.com" style="width:300px;">
  <button onclick="visit()">Go</button>  <script>
    function visit() {
      const url = document.getElementById('url').value;
      const encoded = __uv$config.encodeUrl(url);
      location.href = '/uv/service/' + encoded;
    }
  </script></body>
</html>/* Railway deployment steps:

1. Put these files into a folder.


2. Upload folder to GitHub.


3. In Railway, click New Project.


4. Deploy from GitHub Repo.


5. Railway auto-installs and runs npm start. */


