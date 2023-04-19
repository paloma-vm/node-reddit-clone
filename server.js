// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// App Setup
const app = express();

require('./controllers/posts')(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); // had to add .engine after exphbs
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set db
const db = require('./data/reddit-db');

// Routes
// app.get('/', (req, res) => {
//   res.send('Hello Reddit')
// })


/* code below from Braus' video */
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

// CASES RESOURCE

// NEW
app.get('/cases/new', (req, res) => {
  res.render('cases-new', {});
})

// CREATE
const Post = require('./models/post'); // had to change from '../models/post'

module.exports = (app) => {
  // CREATE
  app.post('/posts/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
    post.save(() => res.redirect('/'));
  });
  
};

// INDEX

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