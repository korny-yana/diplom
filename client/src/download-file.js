function downloadFiles(name, data) {
  const blob = new Blob([data], { type: "application/octet-binary" });
  const url = URL.createObjectURL(blob);
  download(url, name);
  URL.revokeObjectURL(url);
}
const download = (path, filename) => {
  const anchor = document.createElement("a");
  anchor.href = path;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

module.exports = { downloadFiles };
