const {createUser, getUserById, getUsers, updateUser, deleteUser, login, getUserByEmail} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_validation");

router.post("/", createUser);
router.get("/",checkToken, getUsers);
router.post("/getUserByEmail",checkToken, getUserByEmail);
router.get("/:id",checkToken, getUserById);
router.patch("/",checkToken, updateUser);
router.delete("/",checkToken, deleteUser);
router.post("/login", login)
module.exports = router;
