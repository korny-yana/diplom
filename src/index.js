const fs = require("fs");
const archiver = require("archiver");
const config = require("./config/index");
const { createClient } = require("webdav");
const output = fs.createWriteStream(__dirname + "/example.zip");
const archive = archiver("zip", {
  zlib: { level: 9 },
});
async function getDirectory() {
  return new Promise((resolve) => {
    const client = createClient(config.NASA_SERVICE_URL, {
      username: config.NASA_USERNAME,
      password: config.NASA_PASSWORD,
    });
    const directoryItems = client.getDirectoryContents("/");
    resolve(directoryItems);
  });
}
async function getDirectoryItem() {
  const p = await getDirectory();
  for (i = 0; i < p.length; i++) {
    if (p[i].type === "directory") {
      archive.directory(p[i].basename, p[i].basename);
      archive.pipe(output);
    }
  }
}

(async () => {
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
  await getDirectoryItem();
  output.on("end", function () {
    console.log("Data has been drained");
  });
  archive.finalize();
})();
