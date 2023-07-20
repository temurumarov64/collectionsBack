const Router = require("express");
const router = new Router();
const extraFieldsCollectionItemsValuesController = require("../controllers/extraFieldsCollectionItemsControllerValues");

router.post(
  "/create-extra-field",
  extraFieldsCollectionItemsValuesController.deleteExtraFieldValue
);

router.get(
  "/all",
  extraFieldsCollectionItemsValuesController.getAllExtraFieldsValues
);

router.get(
  "/:id",
  extraFieldsCollectionItemsValuesController.getAllExtraFieldValueById
);

router.delete(
  "/:id",
  extraFieldsCollectionItemsValuesController.deleteExtraFieldValue
);

router.put(
  "/:id",
  extraFieldsCollectionItemsValuesController.updateExtraFieldValue
);

module.exports = router;
