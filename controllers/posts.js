const Post = require('../models/post');

// module.exports = (app) => {
//   // CREATE
//   app.post('/posts/new', (req, res) => {
//     console.log(req.body);
//   });
// };

module.exports = (app) => {
  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req.body);
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save(() => res.redirect('/'));
  });

  // READ -- not async/await
  // app.get('/', (req, res) => {
  //   Post.find({}).lean()
  //     .then((posts) => res.render('posts-index', { posts }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     })
  // })

  // READ -- async/await
  app.get('/', async (req, res) => {
    try {
      const posts = await Post.find({}).lean();
      return res.render('posts-index', { posts });
    } catch (err) {
      console.log(err.message);
    }
  });

  // LOOK UP THE POST -- not async/await
  // app.get('/posts/:id', (req, res) => {
  //   Post.findById(req.params.id).lean()
  //     .then((post) => res.render('posts-show', { post }))
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // });
  
  // LOOK UP THE POST -- async/await
  app.get('/posts/:id', async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      return res.render('posts-show', { post });
    } catch (err) {
      console.log(err.message);
    }
  });

};