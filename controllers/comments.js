const { Comment, User } = require("../models");
const jwt = require("jsonwebtoken");

class CommentsController {
  async createComment(req, res) {
    const token = jwt.decode(
      req.headers.authorization.split(" ")[1],
      process.env.SECRET_KEY
    );
    try {
      const comment = await Comment.create({
        collectionItems_id: req.body.id,
        text: req.body.comment,
        user_id: token.id,
      });
      res.json({ comment });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await Comment.findAll();
      return res.json(comments);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async getCommentsById(req, res) {
    const { id: collectionItems_id } = req.params;
    try {
      const comment = await Comment.findAll({
        where: { collectionItems_id },
        include: [
          {
            model: User,
          },
        ],
      });
      return res.json(comment);
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async deleteComment(req, res) {
    const { id } = req.params;
    try {
      await Comment.destroy({ where: { id } });
      return res.status(200).json({ msg: "Comment has been deleted" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }

  async editComment(req, res) {
    const { id } = req.params;
    try {
      await Comment.update(req.body, { where: { id } });
      return res.status(200).json({ msg: "Comment has been updated" });
    } catch (e) {
      res.status(500).json(e.message);
      return;
    }
  }
}

module.exports = new CommentsController();
