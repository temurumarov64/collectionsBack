const {
  CollectionItem,
  ExtraFieldsCollectionItemsValue,
  ExtraFieldsCollectionItem,
  Collection,
  User,
} = require("../models");
const { QueryTypes } = require("sequelize");
const sequelize = require("../database");

class CollectionItemsController {
  async getAllCollectionItems(req, res) {
    try {
      const collectionItems = await CollectionItem.findAll();
      return res.json(collectionItems);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getCollectionItemById(req, res) {
    const { id } = req.params;
    try {
      const collectionItem = await CollectionItem.findOne({ where: { id } });
      return res.json(collectionItem);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getItemBySearch(req, res) {
    const { search } = req.params;
    try {
      const searchQuery = await sequelize.query(
        "SELECT id, theme, name FROM collections WHERE to_tsvector(description) @@ to_tsquery(:search)",
        { replacements: { search } }
      );
      return res.json(searchQuery);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getRecentItems(req, res) {
    try {
      const collectionItems = await CollectionItem.findAll({
        limit: 9,
        order: [["created_at", "DESC"]],
        include: [
          {
            model: Collection,
          },
        ],
      });
      const collections = await Collection.findAll({
        limit: 9,
        order: [["created_at", "DESC"]],
        include: [
          {
            model: User,
          },
        ],
      });
      return res.json({
        collectionItems,
        collections,
      });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteCollectionItem(req, res) {
    const { id } = req.params;
    try {
      await CollectionItem.destroy({ where: { id } });
      return res.status(200).json({ msg: "Item has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async updateCollectionItem(req, res) {
    const { id } = req.params;
    try {
      await CollectionItem.update(req.body, { where: { id } });
      return res.status(200).json({ msg: "Item has been updated" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new CollectionItemsController();
