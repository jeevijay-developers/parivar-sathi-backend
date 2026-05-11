const mongoose = require("mongoose");
const slugify = require("slugify");
require("dotenv").config();

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

const Blog = mongoose.model("Blog", blogSchema);

async function fixDuplicateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Get all blogs sorted by creation date
    const allBlogs = await Blog.find({}).sort({ createdAt: 1 });
    console.log(`Found ${allBlogs.length} total blogs`);

    const slugMap = {};
    let updated = 0;

    for (const blog of allBlogs) {
      let baseSlug = slugify(blog.title, { lower: true, strict: true });
      let slug = baseSlug;
      let counter = 1;

      // Check if this slug is already used by another blog
      while (slugMap[slug] && slugMap[slug] !== blog._id.toString()) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      // If slug changed, update the blog
      if (slug !== blog.slug) {
        blog.slug = slug;
        await blog.save();
        console.log(`✓ Updated: "${blog.title}" → /blog/${slug}`);
        updated++;
      } else if (!slugMap[slug]) {
        console.log(`✓ Verified: "${blog.title}" → /blog/${slug}`);
      }

      // Add to map
      slugMap[slug] = blog._id.toString();
    }

    console.log(`\n=== Summary ===`);
    console.log(`Total blogs: ${allBlogs.length}`);
    console.log(`Blogs updated: ${updated}`);
    console.log(`Unique slugs: ${Object.keys(slugMap).length}`);

    // Show all blogs with their slugs
    console.log("\n=== All Blogs with Slugs ===");
    const finalBlogs = await Blog.find({}).select("title slug").sort({ createdAt: 1 });
    finalBlogs.forEach((blog, index) => {
      console.log(`${index + 1}. ${blog.title}`);
      console.log(`   URL: /blog/${blog.slug}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

fixDuplicateSlugs();
