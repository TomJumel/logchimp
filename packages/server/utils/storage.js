const path = require("path");
const fs = require("node:fs");
const { STORAGE_PATH } = process.env;

function ensureStorageReady() {
  if (!fs.existsSync(getStoragePath())) {
    createStorage(getStoragePath());
  }
}

function getStoragePath() {
  return path.join(STORAGE_PATH);
}

function createStorage(path) {
  fs.mkdirSync(path, { recursive: true });
}

function getStoragePathFor(item) {
  item = path.join(getStoragePath(), item);
  if (!fs.existsSync(item)) {
    createStorage(item);
  }
  return item;
}

module.exports = {
  ensureStorageReady,
  getStoragePathFor,
};