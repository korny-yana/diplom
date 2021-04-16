const { getDirectoryContents } = require("./get-directory");
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");
const output = fs.createWriteStream("files.zip");
const archive = archiver("zip", {
  zlib: { level: 3 },
});

function archiveDirectory() {
  await getDirectoryContents("");
  archive.directory("././archive", "archive");
  await archive.pipe(output);
  archive.finalize();
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
}
module.exports = {archiveDirectory}