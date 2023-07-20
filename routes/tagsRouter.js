const Router = require("express");
const router = new Router();
const TagsController = require("../controllers/tags");

router.post("/create-tag", TagsController.createTag);

router.get("/all", TagsController.getAllTags);

router.get("/:id", TagsController.getTagById);

router.delete("/:id", TagsController.deleteTag);

module.exports = router;
