const archiver = require("archiver");
const fs = require("fs");
async function archiveDirectory(path) {
  const output = fs.createWriteStream("archive.zip");
  const archive = archiver("zip", {
  zlib: { level: 3 },
});
  if (path === "getArchive") {
    path = __dirname + "/archive";
  }
  archive.directory(path, "archive");
  await archive.pipe(output);
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
  archive.finalize();
}
module.exports = { archiveDirectory };
