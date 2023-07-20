const Router = require("express");
const router = new Router();
const userRouter = require("../controllers/users");

router.post("/signup", userRouter.signup);
router.post("/login", userRouter.login);
router.get("/", userRouter.getAll);
router.delete("/:id", userRouter.deleteUser);

module.exports = router;
