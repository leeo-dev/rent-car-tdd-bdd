const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("../../src/service/carService");
const { join } = require("path");

const mocks = {
  validCategory: require("../Mocks/valid-carCategory.json"),
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
    const result = await chooseRandomCar(carCategory);
  });
});
