const { Post } = require("../models/Post");

module.exports = {
  async find(req, res, next) {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ msg: "The post not found" });
    } else {
      req.post = post;
      next();
    }
  },

  async index(req, res) {
    const posts = await Post.findAll();

    res.json(posts);
  },

  // Show
  async show(req, res) {
    res.json(req.post);
  },

  // Update
  async update(req, res) {
    req.post.title = req.body.title;
    req.post.body = req.body.body;

    req.post.save().then((post) => {
      res.json(post);
    });
  },

  // Delete
  async delete(req, res) {
    req.post.destroy().then((post) => {
      res.json({ msg: `The ${post} is removed.` });
    });
  },
};