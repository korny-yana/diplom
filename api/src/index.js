const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 3000;
const { getDirectoryMap } = require("./directory-map");
const { getDirectoryContents } = require("./get-directory");
const server = http.createServer((req, res) => {
  res.statusCode = 200;
 fs.readFile(__dirname + '/directory-map.json', function(err, data) {
     if (err) throw err;
     res.writeHead(200, {"Content-Type": "application/json"})
     res.end(data)
 })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

setInterval(async () => {
  await getDirectoryMap();
  await getDirectoryContents("");
}, 86400000);
