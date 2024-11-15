const { Router } = require("express");
const { getUsers, createUser, updateUser, removeUser, upload } = require("../controller/userController");


const userRoute = Router();

userRoute.get("/",getUsers);
userRoute.post("/register",upload.array("image",1),createUser);
// userRoute.patch("/",updateUser);
// userRoute.delete("/",removeUser);

module.exports = userRoute;