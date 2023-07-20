const { Like } = require("../models");
class LikesController {
  async createLike(req, res) {
    try {
      const like = await Like.create({
        collectionItems_id: req.body.collectionItems_id,
        user_id: req.body.user_id,
      });
      res.json({ like });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllLikes(req, res) {
    try {
      const likes = await Like.findAll();
      return res.json(likes);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getLikeById(req, res) {
    const { id } = req.params;
    try {
      const like = await Like.findOne({ where: { id } });
      return res.json(like);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteLike(req, res) {
    const { id } = req.params;
    try {
      await Like.destroy({ where: { id } });
      return res.status(200).json({ msg: "Like has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new LikesController();
