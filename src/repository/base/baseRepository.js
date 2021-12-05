const { readFile } = require("fs/promises");

class BaseRepository {
  constructor({ file }) {
    this.file = file;
  }

  async find(itemId) {
    const content = JSON.parse(await readFile(this.file));
    if (!itemId) return content;
    const car = content.find(({ id }) => id === itemId);
    return car;
  }
}
module.exports = BaseRepository;
