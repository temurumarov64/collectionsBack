const Router = require("express");
const router = new Router();
const extraFieldsCollectionItemsController = require("../controllers/extraFieldsCollectionItemsController");

router.post(
  "/create-extra-field",
  extraFieldsCollectionItemsController.createExtraField
);
router.get("/all", extraFieldsCollectionItemsController.getAllExtraFields);

router.get(
  "/:id",
  extraFieldsCollectionItemsController.getAllExtraFieldsByCollectionId
);

router.delete("/:id", extraFieldsCollectionItemsController.deleteExtraField);
router.put("/:id", extraFieldsCollectionItemsController.updateExtraField);

module.exports = router;
