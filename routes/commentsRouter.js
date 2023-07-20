const Router = require("express");
const router = new Router();
const CommentsController = require("../controllers/comments");

router.post("/create-comment", CommentsController.createComment);
router.get("/all", CommentsController.getAllComments);
router.get("/:id", CommentsController.getCommentsById);
router.delete("/:id", CommentsController.deleteComment);
router.put("/:id", CommentsController.editComment);

module.exports = router;
