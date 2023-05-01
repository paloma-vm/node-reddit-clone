const Post = require('../models/post')

const Comment = require('../models/comment');

module.exports = (app) => {

  /* CREATE COMMENT Async/Await version */
  app.post('/posts/:postId/comments', async (req, res) => {
    try {
      // INSTANTIATE INSTANCE OF MODEL
      const comment = await new Comment(req.body);
      // SAVE INSTANCE OF Comment MODEL TO DB
      await comment.save();

      const post = await Post.findById(req.params.postId);
      post.comments.unshift(comment);
      await post.save();

      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  });
  
};