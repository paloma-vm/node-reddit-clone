/* auth.js, aka users.js */
const User = require('../models/user');

module.exports = (app) => {
  // SIGN UP FORM
  app.get('/sign-up', (req, res) => res.render('sign-up'));

  // SIGN UP POST (async)
  app.post('/sign-up', async (req, res) => {
    try {
    // Create User (INSTANTIATE INSTANCE OF MODEL)
    const user = await new User(req.body);
    // SAVE INSTANCE OF User MODEL TO DB
    await user.save();
    res.redirect('/');
    } catch (err) {
        console.log(err.message);
      }
  });
};