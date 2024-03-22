const express = require("express");
const upload = require("../utils/upload");
const postRouter = express.Router();
const postController = require("../controller/postsContoller");

postRouter.get("/", postController.getPosts);
postRouter.post("/", upload.single("img"), postController.createPost);
postRouter.put("/:id", upload.single("img"), postController.updatePost);
postRouter.delete("/:id", postController.deletePost);

module.exports = postRouter;
