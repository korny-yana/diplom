const fetch = require("node-fetch");
async function get() {
  const dir = await fetch("http://127.0.0.1:3000/");
  console.log(dir);
  return dir;
}

module.exports = { get };
