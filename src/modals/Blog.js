const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  content: String,
  bannerImage: String,
  contentImages: [String],
});

module.exports = mongoose.model("Blog", blogSchema);
