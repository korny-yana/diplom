const BASE_PATH = process.cwd() + "/archive";
const fs = require("fs");
const path = require("path");
const { NASA_SERVICE_URL } = require("./config/index");
const { NASA_USERNAME } = require("./config/index");
const { NASA_PASSWORD } = require("./config/index");
const { createClient } = require("webdav");
const queueОfRequests = [];
const client = createClient(NASA_SERVICE_URL, {
  username: NASA_USERNAME,
  password: NASA_PASSWORD,
});

setTimeout(async () => {
  await getDirectoryContents("");
}, 1000);

async function getDirectory(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const directory = await client.getDirectoryContents(name);
      resolve(directory);
    } catch (err) {
      reject(err);
    }
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
        console.log(dir, "уже существует");
      }
    });
  });
}
async function getContents(name) {
  try {
    const file = Buffer.from(await client.getFileContents(name));
    return file;
  } catch (e) {
    const p = [];
    p.push(name);
    console.log(p);
  }
}
async function getDirectoryContents(name) {
  const directoryContents = await getDirectory(name);
  directoryContents.forEach((directory) => {
    queueОfRequests.push(directory);
  });
  for await (let directory of queueОfRequests) {
    switch (directory.type) {
      case "directory": {
        saveDirectory(BASE_PATH + directory.filename);
        queueОfRequests.shift(directory);
        await getDirectoryContents(directory.filename);
        break;
      }
      case "file": {
        console.log(directory.filename);
        const fileContents = await getContents(directory.filename);
        fs.writeFile(
          `${BASE_PATH + directory.filename}`,
          fileContents,
          (err) => {
            if (err) throw err;
            console.log("The file has been saved!");
          }
        );
        queueОfRequests.shift(directory);
        break;
      }
      default: {
        console.log("Ошибка", directory);
        break;
      }
    }
  }
}
/**
 * @param dir - принимает абсолютный путь до локального кaталога в файловой системе
 * @param name - имя папки на удалённом сервере
 */
// function checkFolderContent(dir, name)

module.exports = { getDirectoryContents, BASE_PATH };
