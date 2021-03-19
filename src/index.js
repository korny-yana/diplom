const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const { NASA_SERVICE_URL } = require("./config/index");
const { NASA_USERNAME } = require("./config/index");
const { NASA_PASSWORD } = require("./config/index");
const { createClient } = require("webdav");
const output = fs.createWriteStream("files.zip");
const archive = archiver("zip", {
  zlib: { level: 9 },
});
const client = createClient(NASA_SERVICE_URL, {
  username: NASA_USERNAME,
  password: NASA_PASSWORD,
});
async function getDirectory(name) {
  return new Promise(async (resolve) => {
    const directory = await client.getDirectoryContents(name);
    resolve(directory);
  });
}
async function saveDirectory(name) {
  fs.access(__dirname + "/archive" + name, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(path.join(__dirname + "/archive/", `${name}`), (err) => {
        if (err) {
          return console.error(err);
        }
        console.log("Directory created successfully!");
      });
    } else {
      return;
    }
  });
}
async function getContents(name) {
  const file = await client.getFileContents(name, { format: "text" });
  return file;
}
async function goInsideTheDirectory(name) {
  const directoryContents = await getDirectory(name);
  for (i = 0; i < directoryContents.length; i++) {
    await saveDirectory(directoryContents[i].filename);
    await getDirectoryContents(directoryContents[i].filename);
  }
}
async function getDirectoryContents(name) {
  const directoryContents = await getDirectory(name);
  for (i = 0; i < directoryContents.length; i++) {
    if (!directoryContents[i].type.includes("directory")) {
      await getDirectoryContents("/");
    }
    switch (directoryContents[i].type) {
      case "directory": {
        await saveDirectory(directoryContents[i].filename);
        await goInsideTheDirectory(directoryContents[i].filename);
        break;
      }
      case "file": {
        const fileContents = await getContents(directoryContents[i].filename);
        archive.append(`${fileContents}`, {
          name: directoryContents[i].basename,
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
  await getDirectoryContents("");
  await archive.pipe(output);
  archive.finalize();
  output.on("close", function () {
    console.log(archive.pointer() + " total bytes");
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );
  });
})();
