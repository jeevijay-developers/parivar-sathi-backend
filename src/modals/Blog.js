const mongoose = require("mongoose");
const slugify = require("slugify");

const blogSchema = new mongoose.Schema({
  title: String,
  desc: String,
  content: String,
  bannerImage: String,
  contentImages: [String],
  slug: {
    type: String,
    unique: true,
  },
}, { timestamps: true });

blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
