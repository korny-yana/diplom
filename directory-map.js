const fs = require("fs");
let dir = __dirname + "/archive";
const folders = [];
getFolderMap(dir);
async function getFolderMap(fol) {
  fs.readdir(fol, async (err, files) => {
    if (err) console.log(err);
    else {
      files.forEach((file) => {
        folders.push(file);
      });
      for (let folder of folders) {
        
        await getFolderMap(dir);
        console.log(folders);
      }
    }
  });
}
//   fs.writeFile(__dirname + "/directory-map.json", folders, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
