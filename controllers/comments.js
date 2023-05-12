const Post = require('../models/post')
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {

  /* CREATE COMMENT Async/Await version */
  app.post('/posts/:postId/comments', async (req, res) => {
    if (req.user) {
      // INSTANTIATE INSTANCE OF MODEL
      const userId = req.user._id;
      const comment = await new Comment(req.body);
      comment.author = userId
      
      try {
        // SAVE INSTANCE OF Comment MODEL TO DB
        await comment.save();
        const post = await Post.findById(req.params.postId);
        post.comments.unshift(comment);
        await post.save();
        const user = await User.findById(userId);
        user.comments.unshift(comment);
        await user.save();

        res.redirect('/'); // maybe change this?
      } catch (err) {
        console.log(err.message);
      }
    }
  })
  
}