module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    const { name, age } = req.body;

    if (Number.isNaN(+age) || age <= 0) {
      res.status(statusCodes.BAD_REQUEST).json("wrong user age");
      return;
    }

    if (name.length < 2) {
      res.status(statusCodes.BAD_REQUEST).json("wrong user name. Name must to be more on 2 point");
      return;
    }
    next();
  },
};
