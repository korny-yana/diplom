const { getDirectoryMap } = require("./directory-map");
const { archiveDirectory } = require("./archiver");
const http = require("http");
const fs = require("fs");
const path = require("path");
const headers = {
  Accept: "application/json",
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
      fs.readFile(__dirname + "/directory-map.json", function (err, data) {
        if (err) throw err;
        responseEnd(data);
      });
      break;
    }
    case "/archive": {
      await getDirectoryMap(__dirname + req.url);
      fs.readFile(__dirname + "/directory-map.json", function (err, data) {
        if (err) throw err;
        responseEnd(data);
      });
      break;
    }
    case "/allArchive": {
      await archiveDirectory(__dirname + "/archive");
      fs.readFile(__dirname + "/directory-map.json", function (err, data) {
        if (err) throw err;
        responseEnd(data);
      });
      break;
    }
    default: {
      const request = req.url.slice(1);
      if (path.extname(req.url)) {
        const data = Buffer.from(fs.readFileSync(request));
        responseEnd(data);
      } else {
        await getDirectoryMap(request);
        fs.readFile(__dirname + "/directory-map.json", function (err, data) {
          if (err) throw err;
          responseEnd(data);
        });
      }
      break;
    }
  }
  res.statusCode = 200;
  function responseEnd(data) {
    res.writeHead(200, headers);
    res.write(data);
    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
