const Router = require("express");
const router = new Router();
const LikesController = require("../controllers/likes");

router.post("/create-like", LikesController.createLike);

router.get("/all", LikesController.getAllLikes);

router.get("/:id", LikesController.getLikeById);

router.delete("/:id", LikesController.deleteLike);

module.exports = router;
