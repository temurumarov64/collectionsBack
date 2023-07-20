const { Tag } = require("../models");
class TagsController {
  async createTag(req, res) {
    try {
      const tag = await Tag.create({
        collectionItems_id: req.body.collectionItems_id,
        text: req.body.text,
      });
      res.json({ tag });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllTags(req, res) {
    try {
      const tags = await Tag.findAll();
      return res.json(tags);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getTagById(req, res) {
    const { id } = req.params;
    try {
      const tag = await Tag.findOne({ where: { id } });
      return res.json(tag);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteTag(req, res) {
    const { id } = req.params;
    try {
      await Tag.destroy({ where: { id } });
      return res.status(200).json({ msg: "Tag has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new TagsController();
