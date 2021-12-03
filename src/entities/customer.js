const Base = require("./base/baseEntity");
class Customer extends Base {
  constructor({ id, name, age }) {
    super({ id, name });
    this.age = age;
  }
}
module.exports = Customer;
