const { workerData, parentPort, postMessage } = require("worker_threads");
const { client } = require("../config/index");
const fs = require("fs");
const name = workerData.name;
const dir = workerData.dir;
(async () => await writeContentsFile(dir))();
async function getContents(name) {
  try {
    const file = Buffer.from(await client.getFileContents(name));
    return file;
  } catch (e) {
    console.log(name);
  }
}
async function writeContentsFile(dir) {
  const file = await getContents(name);
  const writableStream = fs.createWriteStream(dir);
  writableStream.write(file);
}
parentPort.postMessage({ name: workerData, status: "Done" });
