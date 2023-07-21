const {
  Collection,
  ExtraFieldsCollectionItem,
  ExtraFieldsCollectionItemsValue,
} = require("../models");
const { CollectionItem } = require("../models");
const jwt = require("jsonwebtoken");
const cloudinary = require("../uploadImage.js");

class CollectionsController {
  async createCollection(req, res) {
    const token = jwt.decode(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );

    // const image = req.body.photo;
    let uploadRes =
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

    // if (image) {
    //    uploadRes = await cloudinary.uploader.upload(image);
    // }

    try {
      const collection = await Collection.create({
        name: req.body.name,
        description: req.body.description,
        theme: req.body.theme,
        photo:
          "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        user_id: token.id,
      });
      if (req.body.extraFields && req.body.extraFields.length > 0) {
        req.body.extraFields.forEach(async (extraField) => {
          const extraFieldsCollectionItem =
            await ExtraFieldsCollectionItem.create({
              collection_id: collection.id,
              name: extraField.column_name,
              type: extraField.column_type,
            });
        });
      }

      res.json(req.body);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllCollections(req, res) {
    try {
      const collections = await Collection.findAll();
      return res.json(collections);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getCollectionsByUserId(req, res) {
    const token = jwt.decode(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    const user_id = token.id;
    try {
      const collectionsByUser = await Collection.findAll({
        where: { user_id },
      });
      return res.json(collectionsByUser);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  // Create collection item

  async createCollectionItem(req, res) {
    const { id } = req.params;
    try {
      const collectionItem = await CollectionItem.create({
        collection_id: id,
        name: req.body.name,
      });
      const { name, ...body } = req.body;
      for (const [key, value] of Object.entries(body)) {
        const extraFields = await ExtraFieldsCollectionItemsValue.create({
          collectionItems_id: collectionItem.id,
          extraFieldsCollectionItems_id: Number(key),
          value,
        });
      }
      res.json({ collectionItem });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getCollectionItemsByCollection(req, res) {
    const { id: collection_id } = req.params;
    try {
      const collectionItemsByCollection = await CollectionItem.findAll({
        where: { collection_id },
      });
      return res.json(collectionItemsByCollection);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getCollectionItemById(req, res) {
    const { id: collection_item_id, collectionId } = req.params;
    try {
      const collectionItem = await CollectionItem.findOne({
        where: { id: collection_item_id },
      });

      const collectionItemsExtraFieldsValues =
        await ExtraFieldsCollectionItemsValue.findAll({
          where: { collectionItems_id: collectionItem.dataValues.id },
        });

      const extraFieldsCollectionItems =
        await ExtraFieldsCollectionItem.findAll();

      return res.json({
        name: collectionItem["name"],
        collectionItemsExtraFieldsValues,
        extraFieldsCollectionItems,
      });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getBiggestCollections(req, res) {
    try {
      const collections = await Collection.findAll({
        include: [
          {
            model: CollectionItem,
          },
        ],
      });
      return res.json(collections);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteCollection(req, res) {
    const { id } = req.params;
    try {
      await Collection.destroy({ where: { id } });
      return res.status(200).json({ msg: "Collection has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async updateCollection(req, res) {
    const { id } = req.params;
    try {
      await Collection.update(req.body, { where: { id } });
      return res.status(200).json({ msg: "Collection has been updated" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new CollectionsController();
