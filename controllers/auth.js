/* auth.js, aka users.js */
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));

  // SIGN UP POST
  app.post('/sign-up', (req, res) => {
    // Create User and JWT
    const user = new User(req.body);

    user
      .save()
      .then(() => {
        const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        return res.redirect('/');
      });
  });

  // SIGN UP POST (async)
  // app.post('/sign-up', async (req, res) => {
  //   try {
  //   // Create User (INSTANTIATE INSTANCE OF MODEL)
  //   const user = await new User(req.body);
  //   // SAVE INSTANCE OF User MODEL TO DB
  //   await user.save();
  //   res.redirect('/');
  //   } catch (err) {
  //       console.log(err.message);
  //     }
  // });
};