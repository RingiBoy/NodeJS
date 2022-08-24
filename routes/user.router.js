const { Router } = require("express");
const { userController } = require("../controllers");
const { userMiddleware, commonMiddleware } = require("../middlewares");

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post(
  "/",

  userMiddleware.checkIsUserBodyValid,
   userMiddleware.checkIsUserEmailUniq,
  userController.createUser
);

userRouter.get(
  "/:userId",
  commonMiddleware.checkIsIdValid("userId"),
  userMiddleware.isUserPresent(),
  userController.getUserById
);
userRouter.delete(
  "/:userId",
  commonMiddleware.checkIsIdValid("userId"),
  userMiddleware.isUserPresent(),
  userController.deleteUserById
);
userRouter.put(
  "/:userId",
  commonMiddleware.checkIsIdValid("userId" ), //по умолчанию, если ничего не передать будет парамс
  userMiddleware.isUserPresent(),
  userMiddleware.checkIsUserEmailUniq,
  userController.updateUser
);

module.exports = userRouter;
