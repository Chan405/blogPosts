const mongoose = require("mongoose");

// Create a schema for the data
const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    photo: String,
  },
  { timestamps: true }
);

// Create a model from the schema
module.exports = mongoose.model("Post", postSchema);
