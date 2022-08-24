const { isObjectIdOrHexString } = require("mongoose");
const { statusCode } = require("../constants");

const { apiErorr } = require("../errors");

module.exports = {
  checkIsIdValid: (fieldName, from = "params") => {
    return async (req, res, next) => {
      try {
        req.params.userId;
        if (!isObjectIdOrHexString(req[from][fieldName])) {
          return next(new apiErorr("wrong user age", statusCode.BAD_REQUEST));
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  },
};
