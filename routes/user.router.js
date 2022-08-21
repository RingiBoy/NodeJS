const {Router}=require('express')

const  userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);

userRouter.get("/:userId",userController.getUserById );
userRouter.delete("/:userId", userController.deleteUserById);
userRouter.put("/:userId",userController.updateUser );


module.exports = userRouter


