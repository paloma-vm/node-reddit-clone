const Post = require('../models/post')
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  /* CREATE COMMENT Async/Await version */
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      // INSTANTIATE INSTANCE OF MODEL
      const userId = req.user._id;
      const comment = new Comment(req.body);
      comment.author = userId

      // SAVE INSTANCE OF Comment MODEL TO DB
      await comment.save();
      const post = await Post.findById(req.params.postId);
      post.comments.unshift(comment);
      await post.save();
      res.redirect(`/posts/${req.params.postId}`);
    } catch (err) {
      console.log(err.message);
    }
  });
  
}