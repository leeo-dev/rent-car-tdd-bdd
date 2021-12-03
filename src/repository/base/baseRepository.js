const { readFile } = require("fs/promises");

class BaseRepository {
  constructor({ file }) {
    this.id = file;
  }

  async find(itemId) {
    const result = JSON.parse(await readFile(this.file));
    if (!itemId) return result;
    const car = result.find(({ id }) => id === itemId);
    return car;
  }
}
module.exports = BaseRepository;
