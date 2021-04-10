const fs = require("fs");
const dirTree = require("directory-tree");
const tree = dirTree("../../archive");
setTimeout(async () => {
  await getDirectoryMap();
}, 1000);
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
