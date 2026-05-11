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

async function addSlugsToBlogs() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Find all blogs without slugs
    const blogsWithoutSlugs = await Blog.find({ slug: { $exists: false } });
    
    if (blogsWithoutSlugs.length === 0) {
      console.log("All blogs already have slugs!");
      console.log("\nGenerating slugs for all blogs...");
      
      // Update all blogs with slugs based on title
      const allBlogs = await Blog.find({});
      console.log(`Found ${allBlogs.length} total blogs`);
      
      let updated = 0;
      for (const blog of allBlogs) {
        if (!blog.slug && blog.title) {
          blog.slug = slugify(blog.title, { lower: true, strict: true });
          await blog.save();
          console.log(`✓ Updated: ${blog.title} → ${blog.slug}`);
          updated++;
        }
      }
      
      console.log(`\nTotal updated: ${updated} blogs`);
    } else {
      console.log(`Found ${blogsWithoutSlugs.length} blogs without slugs`);
      
      for (const blog of blogsWithoutSlugs) {
        if (blog.title) {
          blog.slug = slugify(blog.title, { lower: true, strict: true });
          await blog.save();
          console.log(`✓ Updated: ${blog.title} → ${blog.slug}`);
        }
      }
      
      console.log(`\nSuccessfully added slugs to ${blogsWithoutSlugs.length} blogs`);
    }

    // Show updated blogs
    const updatedBlogs = await Blog.find({}).select("title slug");
    console.log("\n=== All Blogs with Slugs ===");
    updatedBlogs.forEach(blog => {
      console.log(`${blog.title} → /blog/${blog.slug}`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

addSlugsToBlogs();
