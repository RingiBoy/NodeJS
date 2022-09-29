
const { Router } = require("express");
const controllersUser = require("../controllers/user.controller");
const mdlwrUser = require('../mdlwr/user.mslwr')

const userRouter = Router();

userRouter.get("/", controllersUser.getAllUsers);

userRouter.post("/", mdlwrUser.checkIsUserBodyValid,controllersUser.createUser);

userRouter.get("/:userId", controllersUser.getUserById);

userRouter.put("/:userId", controllersUser.updateUser);

userRouter.delete("/:userId", controllersUser.deleteUser);

module.exports = userRouter;
