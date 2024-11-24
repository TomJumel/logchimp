// modules
const fs = require("fs");
const path = require("path");
const storageUtils = require("../utils/storage");

/**
 * Following image formats are allowed (they're case sensitive):
 * - jpg
 * - jpeg
 * - png
 * - svg
 */
const serveImages = (req, res) => {
  const imagePathRegex = /^\/(.+)(?:pn|jpe?|sv)g$/gim;
  const filterImagePath = req.url.match(imagePathRegex);

  if (filterImagePath === null) {
    return res.sendStatus(404);
  }
  const basePath = storageUtils.getStoragePathFor("content/images");
  fs.readFile(
    path.join(basePath, filterImagePath[0]),
    (err, data) => {
      if (err) {
        res.sendStatus(404);
      }
      if (data) {
        res.writeHead(200);
        res.end(data);
      }
    },
  );
};

module.exports = serveImages;
