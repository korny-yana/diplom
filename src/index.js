const BASE_PATH = process.cwd() + "/archive/";
console.log(BASE_PATH);
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
function saveDirectory(dir) {
  return new Promise((resolve, reject) => {
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdir(path.join(dir), { recursive: true }, (err) => {
          if (err) {
            reject(err);
          }
          resolve("Directory created successfully!");
        });
      } else {
        reject("unknown error");
      }
    });
  });
}
function checkFolderContent(dir, name) {
  
};
async function getContents(name) {
  const file = await client.getFileContents(name, { format: "text" });
  return file;
}
async function goInsideTheDirectory(name) {
  const directoryContents = await getDirectory(name);
  for (i = 0; i < directoryContents.length; i++) {
    saveDirectory(BASE_PATH + directoryContents[i].filename);
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
        saveDirectory(BASE_PATH + directoryContents[i].filename);
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

/**
 * @param dir - принимает абсолютный путь до локального кaталога в файловой системе
 * @param name - имя папки на удалённом сервере
 */
// function checkFolderContent(dir, name)
