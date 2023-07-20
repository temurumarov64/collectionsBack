const Router = require("express");
const router = new Router();
const collectionItemsController = require("../controllers/collectionItems");

router.get("/all", collectionItemsController.getAllCollectionItems);
router.get("/recent", collectionItemsController.getRecentItems);
router.get("/search-abd/:search", collectionItemsController.getItemBySearch);
router.get("/:id", collectionItemsController.getCollectionItemById);
router.delete("/:id", collectionItemsController.deleteCollectionItem);
router.put("/:id", collectionItemsController.updateCollectionItem);

module.exports = router;
