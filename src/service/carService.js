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

  chooseRandomCar(carCategory) {
    const randomPosition = this.gerRandomPositionFromArray(carCategory.carIds);
    const idCar = carCategory.carIds[randomPosition];
    return idCar;
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory);
    const car = await this.find(carId);
    return car;
  }
}
module.exports = CarService;
