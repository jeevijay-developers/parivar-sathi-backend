require('dotenv').config();
const mongoose = require('mongoose');
const slugify = require('slugify');
const Blog = require('./src/modals/Blog');

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to DB');

    const blogs = await Blog.find({});
    let updatedCount = 0;
    for (const blog of blogs) {
      if (!blog.slug && blog.title) {
        blog.slug = slugify(blog.title, { lower: true, strict: true });
        await blog.save();
        console.log('Updated slug for:', blog.title);
        updatedCount++;
      }
    }
    console.log('Migration complete. Updated', updatedCount, 'blogs.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    mongoose.disconnect();
  }
}
migrate();
