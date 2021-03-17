// const fs = require("fs");
// const archiver = require("archiver");
// const getDirectory = require("./index");
// async function getDirectoryItems() {
//   const p = await getDirectory;
//   console.log(p.length);
// }
// getDirectoryItems();
// const output = fs.createWriteStream(__dirname + "/example.zip");
// const archive = archiver("zip", {
//   zlib: { level: 9 }, // Sets the compression level.
// });

// // listen for all archive data to be written
// // 'close' event is fired only when a file descriptor is involved
// output.on("close", function () {
//   console.log(archive.pointer() + " total bytes");
//   console.log(
//     "archiver has been finalized and the output file descriptor has closed."
//   );
// });

// // This event is fired when the data source is drained no matter what was the data source.
// // It is not part of this library but rather from the NodeJS Stream API.
// // @see: https://nodejs.org/api/stream.html#stream_event_end
// output.on("end", function () {
//   console.log("Data has been drained");
// });

// archive.pipe(output);
// // archive.append(getDirectoryItems);
// // archive.append();
// // archive.finalize();
