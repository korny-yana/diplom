const BASE_PATH = __dirname + "/archive";
const { Worker } = require("worker_threads");

const fs = require("fs");
const path = require("path");
const { NASA_SERVICE_URL } = require("../config/index");
const { NASA_USERNAME } = require("../config/index");
const { NASA_PASSWORD } = require("../config/index");
const { createClient } = require("webdav");
const queueОfRequests = [];
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
        resolve("Directory exist");
      }
    });
  });
}

function startWorker(filename) {
  const worker = new Worker(path.join(__dirname, "./workers.js"), {
    workerData: {
      name: filename,
      dir: BASE_PATH + filename,
    },
  });
}

async function getDirectoryContents(name) {
  const directoryContents = await getDirectory(name);
  directoryContents.forEach((directory) => {
    queueОfRequests.push(directory);
  });
  for await (let directory of queueОfRequests) {
    switch (directory.type) {
      case "directory": {
        queueОfRequests.shift();
        saveDirectory(BASE_PATH + directory.filename);
        await getDirectoryContents(directory.filename);
        break;
      }
      case "file": {
        // await writeContentsFile(fileContents, BASE_PATH + directory.filename);
        queueОfRequests.shift();
        startWorker(directory.filename);
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

module.exports = { getDirectoryContents, BASE_PATH, client };
