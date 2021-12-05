const BaseRepository = require("./../repository/base/baseRepository");
class CarService {
  constructor({ car }) {
    this.carRepository = new BaseRepository({ file: car });
  }
  gerRandomPositionFromArray(list) {
    const indexList = list.length;
    return Math.floor(Math.random() * indexList);
  }
  async find(id) {
    return await this.carRepository.find(id);
  }

  chooseRandomCar(carCategory) {}
}
module.exports = CarService;
