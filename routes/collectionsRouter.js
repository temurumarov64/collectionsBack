const Router = require("express");
const router = new Router();
const collectionsController = require("../controllers/collections");
const imageController = require("../controllers/imageUpload");

router.post(
  "/create-collection",
  imageController.upload,
  collectionsController.createCollection
);
router.post("/:id/create-item", collectionsController.createCollectionItem);
router.get("/all", collectionsController.getAllCollections);
router.get("/byUser", collectionsController.getCollectionsByUserId);
router.get(
  "/:id/collection-items",
  collectionsController.getCollectionItemsByCollection
);
router.get(
  "/:collectionId/collection-items/:id",
  collectionsController.getCollectionItemById
);
router.get("/biggest", collectionsController.getBiggestCollections);
router.delete("/:id", collectionsController.deleteCollection);
router.put("/:id", collectionsController.updateCollection);

module.exports = router;
