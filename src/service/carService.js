const { taxesBasedOnAge } = require("../entities/tax");
const BaseRepository = require("./../repository/base/baseRepository");
class CarService {
  constructor({ car }) {
    this.carRepository = new BaseRepository({ file: car });
    this.taxesBasedOnAge = taxesBasedOnAge;
    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
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

  calculateFinalPrice({ customer, carCategory, numbersOfDay }) {
    const { age } = customer;
    const { price } = carCategory;
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );
    const finalPrice = price * 1.3 * numbersOfDay;
    const formattedPrice = this.currencyFormat.format(finalPrice);
    return formattedPrice;
  }
}
module.exports = CarService;
