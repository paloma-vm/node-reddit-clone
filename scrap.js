  // CREATE Comment (orig version)
  app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);

    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(() => Post.findById(req.params.postId))
      .then((post) => {
        post.comments.unshift(comment);
        return post.save();
      })
      .then(() => res.redirect('/'))
      .catch((err) => {
        console.log(err);
      });
  });

  // orig version sign-up
  module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => res.render('sign-up'));
  
    // SIGN UP POST
    app.post('/sign-up', (req, res) => {
      // Create User
      const user = new User(req.body);
  
      user
        .save()
        .then(() => res.redirect('/'))
        .catch((err) => {
          console.log(err.message);
        });
    });
  
    
  };