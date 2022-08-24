const { statusCode } = require("../constants");
const { apiErorr } = require("../errors");
const carService = require("../services/car.service");

module.exports = {
  checkIsCarBodyValid: async (req, res, next) => {
    try {
      

      //   if (Number.isNaN(+age) || age <= 0) {
      //     return next(new apiErorr("wrong car age", statusCode.BAD_REQUEST));
      //   }

      //   if (name.length < 2) {
      //     return next(
      //       new apiErorr(
      //         "wrong car name. Name must to be more on 2 point",
      //         statusCode.BAD_REQUEST
      //       )
      //     );
      //   }
      next();
    } catch (error) {
      next(error);
    }
  },

  isCarPresent: async (req, res, next) => {
    try {
      const { carId } = req.params;

      const car = await carService.getOneById(carId);

      if (!car) {
        return next(new apiErorr("Car not found", statusCode.NOT_FOUND));
      }
      req.car = car;
      next();
    } catch (error) {
      next(error);
    }
  },
};
