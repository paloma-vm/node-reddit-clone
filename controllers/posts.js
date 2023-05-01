const Post = require('../models/post');

// module.exports = (app) => {
//   // CREATE
//   app.post('/posts/new', (req, res) => {
//     console.log(req.body);
//   });
// };

module.exports = (app) => {
  // INDEX
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });
  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req.body);
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save(() => res.redirect('/'));
  });

  app.get('/posts/new', (req, res) => {
    res.render('posts-new')
  })

  // READ -- not async/await
  // app.get('/', (req, res) => {
  //   Post.find({}).lean()
  //     .then((posts) => res.render('posts-index', { posts }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // })

  // READ -- async/await


  // LOOK UP THE POST -- not async/await
  // app.get('/posts/:id', (req, res) => {
  //   Post.findById(req.params.id).lean()
  //     .then((post) => res.render('posts-show', { post }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });

  // SHOW -- async/await
  // app.get('/posts/:id', async (req, res) => {
  //   try {
  //     const post = await Post.findById(req.params.id).lean();
  //     return res.render('posts-show', { post });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // });

  /* SHOW (LOOK UP POST) async  */
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().populate('comments');
      res.render('posts-show', { post });
    } catch(err) {
      console.log(err.message);
    }
  });
     

  /* LOOK UP POST */
  // Post
  //   .findById(req.params.id).lean().populate('comments')
  //   .then((post) => res.render('post-show', { post }))
  //   .catch((err) => {
  //     console.log(err.message);
  // }); 

  // SUBREDDIT
  // orig version 
  // app.get('/n/:subreddit', (req, res) => {
  //   console.log(req.params.subreddit);
  // });

  // async version
  app.get('/n/:subreddit', async (req, res) => {
    try {
      const posts = await Post.find({ subreddit: req.params.subreddit }).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
    console.log(req.params.subreddit);
  });
  

};