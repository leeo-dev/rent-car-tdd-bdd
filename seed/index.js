const faker = require("faker");
const { writeFile } = require("fs/promises");
const { join } = require("path");
const Car = require("../src/entities/car");
const CarCategory = require("../src/entities/carCategory");
const Customer = require("../src/entities/customer");
const LIMIT = 2;

const cars = [];
const customers = [];

const seederFolder = join(__dirname, "../", "database");

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100),
});

for (let index = 1; index <= LIMIT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  });
  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 26, max: 60 }),
  });
  carCategory.carIds.push(car.id);
  customers.push(customer);
  cars.push(car);
}
const write = (filename, data) => {
  return writeFile(join(seederFolder, filename), JSON.stringify(data));
};
(async () => {
  await write("cars.json", cars);
  await write("customers.json", customers);
  await write("carCategory.json", [carCategory]);
})();
