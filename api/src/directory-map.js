const fs = require("fs");
const dirTree = require("directory-tree");

async function getDirectoryMap(path) {
  const tree = dirTree(path, { normalizePath: true });
  fs.writeFile(
    __dirname + "/directory-map.json",
    JSON.stringify(tree),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
module.exports = { getDirectoryMap };
