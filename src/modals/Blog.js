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

blogSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    let baseSlug = slugify(this.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists (and it's not the current document being updated)
    let existingBlog = await mongoose.model("Blog").findOne({ slug: slug, _id: { $ne: this._id } });
    
    // If slug exists, append counter until we find a unique one
    while (existingBlog) {
      slug = `${baseSlug}-${counter}`;
      existingBlog = await mongoose.model("Blog").findOne({ slug: slug, _id: { $ne: this._id } });
      counter++;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("Blog", blogSchema);
