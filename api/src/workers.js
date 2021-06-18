const { workerData, parentPort } = require("worker_threads");
const { client } = require("./get-directory");
const { BASE_PATH } = require("./get-directory");
const fs = require("fs");
const name = workerData.name;
const dir = workerData.dir;
writeContentsFile(dir, name);
async function getContents(name) {
  try {
    const file = await client.getFileContents(name);
    console.log(file);
    return file;
  } catch (e) {
    console.log(e);
  }
}
async function writeContentsFile(dir, name) {
  const file = await getContents(name);
  const writableStream = fs.createWriteStream(dir);
  writableStream.write(file);
  parentPort.postMessage({ status: "Done" });
}
