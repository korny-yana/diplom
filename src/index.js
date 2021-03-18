const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const config = require("./config/index");
const { createClient } = require("webdav");
const output = fs.createWriteStream("files.zip");
const archive = archiver("zip", {
  zlib: { level: 9 },
});
let pathDirectory = config.NASA_SERVICE_URL;
const client = createClient(pathDirectory, {
  username: config.NASA_USERNAME,
  password: config.NASA_PASSWORD,
});
async function getDirectory() {
  return new Promise(async (resolve) => {
    const directory = await client.getDirectoryContents("/");
    resolve(directory);
  });
}
// async function saveDirectory(name) {
//   fs.mkdir(path.join(__dirname + "/archive", `${name}`), (err) => {
//     if (err) {
//       return console.error(err);
//     }
//     console.log("Directory created successfully!");
//   });
// }
async function getContents(name) {
  const file = await client.getFileContents(name, { format: "text" });
  return file;
}
async function getDirectoryContents() {
  const directoryContents = await getDirectory();
  for (i = 0; i < directoryContents.length; i++) {
    switch (directoryContents[i].type) {
      case "directory": {
        // pathDirectory = pathDirectory + directoryContents[i].filename;
        // await getDirectory();
        // await saveDirectory(directoryContents[i].basename);
        // console.log(pathDirectory);
        break;
      }
      case "file": {
        const fileContents = await getContents(directoryContents[i].basename);
        archive.append(`${fileContents}`, {
          name: directoryContents[i].filename,
        });
        break;
      }
      default: {
        console.log("Ошибка");
        break;
      }
    }
  }
}
(async () => {
  await getDirectoryContents();
  await archive.pipe(output);
  archive.finalize();
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
})();
