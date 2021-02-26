(async () => {
  const { createClient } = require("webdav");

  const client = createClient("https://podaac-tools.jpl.nasa.gov/drive/files", {
    username: "3rvklin",
    password: "A3#4gp@3WI3ggKqQOPU",
  });

  // Get directory contents
  const directoryItems = await client.getDirectoryContents("/");
  console.log(directoryItems)
})();
