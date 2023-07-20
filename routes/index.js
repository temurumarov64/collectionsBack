const Router = require("express");
const router = new Router();
const collectionsRouter = require("./collectionsRouter");
const collectionItemsRouter = require("./collectionItemsRouter");
const commentsRouter = require("./commentsRouter");
const tagsRouter = require("./tagsRouter");
const likesRouter = require("./likesRouter");
const extraFieldsCollectionItemsRouter = require("./extraFieldsCollectionItems");
const extraFieldsCollectionItemsValuesRouter = require("./extraFieldsCollectionItemsValues");
const usersRouter = require("./usersRouter");

router.use("/collections", collectionsRouter);
router.use("/collectionItems", collectionItemsRouter);
router.use("/comments", commentsRouter);
router.use("/tags", tagsRouter);
router.use("/likes", likesRouter);
router.use("/extraFields", extraFieldsCollectionItemsRouter);
router.use("/extraFieldsValues", extraFieldsCollectionItemsValuesRouter);
router.use("/users", usersRouter);

module.exports = router;
