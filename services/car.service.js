const Car = require("../dataBAse/Car");

module.exports = {
  createCar(carObject) {
    console.log(carObject);
    return Car.create(carObject);
  },

  getAllCars(filter = {}) {
    return Car.find(filter);
  },

  getOneByParams(filter) {
    return Car.findOne(filter);
  },

  getOneById(id) {
    return Car.findById(id).populate('user');
  },

  updateCarById(carId, newCarObject) {
    return Car.updateOne({ _id: carId }, newCarObject, { new: true });
  },

  deleteCarById(carId) {
    return Car.deleteOne({ _id: carId });
  },
};
