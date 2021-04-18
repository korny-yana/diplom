const fetch = require("node-fetch");

async function get() {
  const dir = await fetch("http://192.168.1.189:3000/", {
    method: "get",
  }).then((res) => res.json());

  return dir;
}

module.exports = { get };
