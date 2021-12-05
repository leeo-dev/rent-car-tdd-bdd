const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("../../src/service/carService");
const { join } = require("path");

const mocks = {
  validCarCategory: require("../Mocks/valid-carCategory.json"),
  validCar: require("../Mocks/valid-car.json"),
  validCustomer: require("../Mocks/valid-customer.json"),
};

const carDatabase = join(__dirname, "../../", "database/cars.json");
describe("Suite Test CarService", () => {
  let carService = {};
  let sandbox = {};
  before(() => {
    carService = new CarService({ car: carDatabase });
  });
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("Should retrieve a random position from an array", async () => {
    const data = [0, 1, 2, 3, 4, 5];
    const result = await carService.gerRandomPositionFromArray(data);
    expect(result).to.be.gte(0).and.to.be.lte(data.length);
  });
  it("Should choose the first id from carIds in carCategory", async () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;
    sandbox
      .stub(carService, carService.gerRandomPositionFromArray.name)
      .returns(carIndex);
    const expected = carCategory.carIds[carIndex];
    const result = await carService.chooseRandomCar(carCategory);
    expect(result).to.be.equal(expected);
  });
  it("Give an carCategory it should return an available car !", async () => {
    const carCategory = Object.create(mocks.validCarCategory);
    const car = mocks.validCar;
    carCategory.carIds = [car.id];

    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.chooseRandomCar.name);

    const expected = car;
    const result = await carService.getAvailableCar(carCategory);

    expect(carService.chooseRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
  });
  it("Given an carCategory, customer and numberOfDays it should  calculate final amount in real", async () => {
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;
    const numbersOfDay = 5;
    const expected = carService.currencyFormat.format(244.4);
    const result = carService.calculateFinalPrice({
      customer,
      carCategory,
      numbersOfDay,
    });
    expect(result).to.be.deep.equal(expected);
  });
});
