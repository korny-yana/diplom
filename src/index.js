const BASE_PATH = process.cwd() + "/archive";

const fs = require("fs");
const path = require("path");

const { NASA_SERVICE_URL } = require("./config/index");
const { NASA_USERNAME } = require("./config/index");
const { NASA_PASSWORD } = require("./config/index");
const { createClient } = require("webdav");

const client = createClient(NASA_SERVICE_URL, {
  username: NASA_USERNAME,
  password: NASA_PASSWORD,
});
async function getDirectory(name) {
  return new Promise(async (resolve, reject) => {
    try {
      const directory = await client.getDirectoryContents(name);
      resolve(directory);
    } catch (err) {
      reject("ошибка сервера");
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
        console.log(dir, " уже существует");
      }
    });
  });
}
async function getContents(name) {
  try {
    const file = await client.getFileContents(name, { format: "text" });
    return file;
  } catch (e) {
    console.log("ошибка файла");
  }
}
async function getDirectoryContents(name) {
  const directoryContents = await getDirectory(name);
  directoryContents.forEach((directoryContents) => {
    (async () => {
      switch (directoryContents.type) {
        case "directory": {
          saveDirectory(BASE_PATH + directoryContents.filename);
          await getDirectoryContents(directoryContents.filename);
          break;
        }
        case "file": {
          const fileContents = await getContents(directoryContents.filename);
          fs.writeFile(
            `${BASE_PATH + directoryContents.filename}`,
            fileContents,
            (err) => {
              if (err) throw err;
              console.log("The file has been saved!");
            }
          );
          break;
        }
        default: {
          console.log("Ошибка");
          break;
        }
      }
    })();
  });
}
setTimeout(async () => {
  await getDirectoryContents("");
}, 5000);

/**
 * @param dir - принимает абсолютный путь до локального кaталога в файловой системе
 * @param name - имя папки на удалённом сервере
 */
// function checkFolderContent(dir, name)

module.exports = { getDirectoryContents };
