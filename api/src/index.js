const { getDirectoryMap } = require("./directory-map");
const http = require("http");
const fs = require("fs");
const path = require("path");
const headers = {
  Accept: "text/plain", 
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};

const hostname = "127.0.0.1";
const port = 3000;
const server = http.createServer(async (req, res) => {
  switch (req.url) {
    case "/": {
      await getDirectoryMap(__dirname + "/archive");
      break;
    }
    case "/archive": {
      await getDirectoryMap(__dirname + req.url);
      break;
    }
    default: {
      const request = req.url.slice(1);
      if (path.extname(req.url)) {
        res.writeHead(200, headers);
        res.end(request);
      }
      await getDirectoryMap(request);
      break;
    }
  }

  res.statusCode = 200;
  fs.readFile(__dirname + "/directory-map.json", function (err, data) {
    if (err) throw err;
    res.writeHead(200, headers);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
