const { ExtraFieldsCollectionItem } = require("../models");
class ExtraFieldsCollectionItemController {
  async createExtraField(req, res) {
    try {
      const extraField = await ExtraFieldsCollectionItem.create({
        collection_id: req.body.collection_id,
        name: req.body.name,
        type: req.body.type,
      });
      res.json({ extraField });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllExtraFields(req, res) {
    try {
      const extraFields = await ExtraFieldsCollectionItem.findAll();
      return res.json(extraFields);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllExtraFieldsByCollectionId(req, res) {
    const { id: collection_id } = req.params;
    try {
      const extraField = await ExtraFieldsCollectionItem.findAll({
        where: { collection_id },
      });
      return res.json(extraField);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteExtraField(req, res) {
    const { id } = req.params;
    try {
      await ExtraFieldsCollectionItem.destroy({ where: { id } });
      return res.status(200).json({ msg: "Extra field has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async updateExtraField(req, res) {
    const { id } = req.params;
    try {
      await ExtraFieldsCollectionItem.update(req.body, { where: { id } });
      return res.status(200).json({ msg: "Extra field has been updated" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new ExtraFieldsCollectionItemController();
