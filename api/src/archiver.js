const archiver = require("archiver");
const fs = require("fs");
  const output = fs.createWriteStream("123.zip");
  const archive = archiver("zip", {
    zlib: { level: 3 },
  });
async function archiveDirectory(path) {
  console.log(path);
  archive.directory(path, "archive");
  await archive.pipe(output);
  archive.finalize();
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
}
module.exports = { archiveDirectory };
