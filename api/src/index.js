const http = require("http");
const fs = require("fs");
const headers = {
  Accept: "application/json",
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "XMLHttpRequest",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
};
const hostname = "192.168.1.189";
const port = 3000;
const server = http.createServer((req, res) => {
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
