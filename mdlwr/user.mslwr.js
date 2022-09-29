module.exports = {
  checkIsUserBodyValid: async (req, res, next) => {
    const { name, age } = req.body;

    if (!Number.isInteger(age) || age < 0) {
      return res.status(400).json("set valid age");
    }
    if (!name || name.length < 3) {
      return res.status(400).json("set valid name");
    }
    next();
  },
};
