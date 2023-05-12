const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const currentUser = req.user;
      const posts = await Post.find({}).lean().populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
  });

  // CREATE (async)
  app.post('/posts/new', async (req, res) => {
    console.log(req.body);
    if (req.user) {
      // INSTANTIATE INSTANCE OF POST MODEL
      const userId = req.user._id;
      const post = new Post(req.body);
      post.author = userId;

      try {
        // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
        await post.save();
        const user = await User.findById(userId);
        user.posts.unshift(post);
        await user.save();
        // REDIRECT TO THE NEW POST
        return res.redirect(`/posts/${post._id}`);
    } catch (err) {
      console.log(err.message);
    }
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  /* SHOW (LOOK UP POST) async  */
  app.get('/posts/:id', async (req, res) => {
    try {
      const currentUser = req.user;
      // const post = await Post.findById(req.params.id).lean().populate('comments').populate('author');
      const post = await Post.findById(req.params.id).lean().populate({ path:'comments', populate: { path: 'author' } }).populate('author');

      res.render('posts-show', { post, currentUser });
    } catch(err) {
      console.log(err.message);
    }
  });
     
  /* LOOK UP SUBREDDIT */
  // async version
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const currentUser = req.user;
      const { subreddit } = req.params;
      // const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      const posts = (await Post.find({ subreddit }).lean()).populate('author');
      return res.render('posts-index', { posts, currentUser });
    } catch (err) {
      console.log(err.message);
    }
    console.log(req.params.subreddit);
  });
  

};