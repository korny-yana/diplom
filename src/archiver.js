const { getDirectoryContents } = require("./index");
const archiver = require("archiver");
const fs = require("fs");
const path = require("path");
const output = fs.createWriteStream("files.zip");
const archive = archiver("zip", {
  zlib: { level: 3 },
});

(async () => {
  await getDirectoryContents("");
  archive.directory('././archive', 'archive');
  await archive.pipe(output);
  archive.finalize();
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
})();
