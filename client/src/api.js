const fetch = require("node-fetch");
const {downloadFiles} = require('./download-file')
async function get(pathName) {
  let dir = await fetch(`http://127.0.0.1:3000/${pathName}`, {
    method: "get",
  }).then((res) => res.json());
  dir = Object.values(dir.children);
  return dir;
}
async function getfile(pathName, filename) {
  const response = await fetch(`http://127.0.0.1:3000/${pathName}`, {
    method: "get",
  }).then((response) => response.arrayBuffer());
  downloadFiles(filename, response)
}

async function getArchiveDirectory(pathName, name) {
  if (pathName === undefined) {
    pathName = "getArchive";
    name = "archive"
  }
 const response = await fetch(`http://127.0.0.1:3000/${pathName}`, {
    method: "post", body: name
  }).then((response) => response.arrayBuffer());
  downloadFiles(`${name}.zip`, response)
}

module.exports = { get, getfile, getArchiveDirectory};
