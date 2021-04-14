const fs = require("fs");
const dirTree = require("directory-tree");
const tree = dirTree("archive", { normalizePath: true });
async function getDirectoryMap() {
  fs.writeFile(
    process.cwd() + "/directory-map.json",
    JSON.stringify(tree),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}
module.exports = { getDirectoryMap };
