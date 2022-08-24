const { statusCode } = require("../constants");

const { carService } = require("../services");

module.exports = {
  createCar: async (req, res, next) => {
    try {
      const { _id } = req.user;
      console.log(req.body);
      const car = await carService.createCar({ ...req.body, user: _id });
      res.status(statusCode.CREATE).json(car);
    } catch (error) {
      next(error);
    }
  },

  getCarById: async (req, res, next) => {
    try {
      
      const { car } = req.params;

      // const car = await fileService.getCarById(+carId);
      // const car = await Car.findById(carId);

      res.json(car);
    } catch (error) {
      next(error);
    }
  },

  deleteCarById: async (req, res, next) => {
    try {
      const { carId } = req.params;

      await carService.deleteCarById(carId);

      res.sendStatus(statusCode.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const { carId } = req.params;

      const car = await carService.updateCarById(carId, req.body);

      res.json(car);
    } catch (error) {
      next(error);
    }
  },
};
