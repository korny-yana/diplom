const fetch = require("node-fetch");

async function get(pathName) {
  let dir = await fetch(`http://127.0.0.1:3000/${pathName}`, {
    method: "get",
  }).then((res) => res.json());
  dir = Object.values(dir.children);
  return dir;
}

module.exports = { get };
