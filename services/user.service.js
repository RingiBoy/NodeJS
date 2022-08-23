const User = require("../dataBAse/User");

module.exports = {
  createUser(userObject) {
    console.log(userObject);
    return User.create(userObject);
  },

  getOneByParams(filter) {
    return User.findOne(filter);
  },

  updateUserById(userId, newUserObject) {
    return User.updateOne({ _id: userId }, newUserObject, { new: true });
  },

  deleteUserById(userId) {
    return User.deleteOne({ _id: userId });
  },
};
