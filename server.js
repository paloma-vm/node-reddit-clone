// Require Libraries
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');

// App Setup
const app = express();



// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); // had to add .engine after exphbs
app.set('view engine', 'handlebars');
app.set('views', './views');
// got it working again by moving the 2 lines below from above // Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Add this after you initialize express.
app.use(checkAuth);
app.use(express.static('public'));


// Set db
const db = require('./data/reddit-db');
require('./controllers/posts')(app); // had to move this here
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);


// Routes
// app.get('/', (req, res) => {
//   res.send('Hello Reddit')
// })


/* code below from Braus' video */
// app.get('/', function (req, res) {
//   res.render('home');
// });

// app.get('/posts/new', (req, res) => {
//   res.render('posts-new')
// })

// CASES RESOURCE

// NEW
app.get('/cases/new', (req, res) => {
  res.render('cases-new', {});
})

// CREATE


// SHOW
app.get('/cases/:id', (req, res) => {
  console.log(req.params.id);

  res.render('cases-show', { case: caseData })
});


// EDIT
app.get('/cases/:id/edit', (req, res) => {
// find the case
// render edit form
})

// UPDATE
app.put('/cases/:id', (req, res) => {
// update the case
// redirect show
})

// DESTROY
app.delete('/cases/:id', (req, res) => {
// delete the case
// redirect to index
})

// Start Server

app.listen(3000, () => {
  console.log('Reddit Clone listening on port localhost:3000!');
});

module.exports = app;