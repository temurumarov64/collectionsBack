const { ExtraFieldsCollectionItemsValue } = require("../models");
class ExtraFieldsCollectionItemValueController {
  async createExtraField(req, res) {
    try {
      const extraFieldValue = await ExtraFieldsCollectionItemsValue.create({
        extraFieldsCollectionItems_id: req.body.extraFieldsCollectionItems_id,
        collectionItems_id: req.body.collectionItems_id,
        value: req.body.value,
      });
      res.json({ extraFieldValue });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllExtraFieldsValues(req, res) {
    try {
      const extraFieldsValues = await ExtraFieldsCollectionItemsValue.findAll();
      return res.json(extraFieldsValues);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllExtraFieldValueById(req, res) {
    const { id } = req.params;
    try {
      const extraFieldValue = await ExtraFieldsCollectionItemsValue.findOne({
        where: { id },
      });
      return res.json(extraFieldValue);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteExtraFieldValue(req, res) {
    const { id } = req.params;
    try {
      await ExtraFieldsCollectionItemsValue.destroy({ where: { id } });
      return res
        .status(200)
        .json({ msg: "Extra field value has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async updateExtraFieldValue(req, res) {
    const { id } = req.params;
    try {
      await ExtraFieldsCollectionItemsValue.update(req.body, { where: { id } });
      return res
        .status(200)
        .json({ msg: "Extra field value has been updated" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new ExtraFieldsCollectionItemValueController();
