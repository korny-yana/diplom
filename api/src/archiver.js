const archiver = require("archiver");
const fs = require("fs");
async function archiveDirectory(path, name) {
  const output = fs.createWriteStream("api/src/archive.zip");
  const archive = archiver("zip", {
    zlib: { level: 3 },
  });
  if (path === "getArchive") {
    path = __dirname + "/archive";
  }
  await archive.directory(path, `${name}`);
  await archive.pipe(output);
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
  await archive.finalize();
}
module.exports = { archiveDirectory };
