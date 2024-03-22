const Post = require("../models/postModel");

const getPosts = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const pageSize = parseInt(request.query.pageSize) || 5;
  try {
    const totalCount = await Post.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    response.status(200).json({ posts, totalPages, currentPage: page });
  } catch (e) {
    console.log({ e });
    response.status(400).json({ message: "unknown error" });
  }
};

const createPost = async (request, response) => {
  if (!request.body.title || !request.body.description) {
    response.status(400).json({ message: "Enter required fields" });
  }
  const { title, description } = request.body;

  try {
    const post = await Post.create({
      title,
      description,
      photo: request.file.filename,
    });
    response.status(200).json(post);
  } catch (e) {
    console.log({ e });
    response.status(400).json({ message: "unknown error" });
  }
};

const updatePost = async (request, response) => {
  if (!request.body.title || !request.body.description) {
    response.status(400).json({ message: "Enter required fields" });
  }

  try {
    const post = await Post.findById(request.params.id);
    if (post) {
      const updatedPost = await Post.findByIdAndUpdate(post.id, request.body, {
        new: true,
      });
      response.status(200).json(updatedPost);
    } else {
      response.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    response.status(400).json({ message: "Unknown error" });
  }
};

const deletePost = async (request, response) => {
  const postId = request.params.id;
  try {
    const post = await Post.findById(postId);
    if (post) {
      await post.deleteOne({ id: postId });
      response.status(200).json({ id: postId });
    } else {
      response.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    response.status(400).json({ message: "Unknown error" });
  }
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
};
