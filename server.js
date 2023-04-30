// Require Libraries
const express = require('express');
const exphbs = require('express-handlebars');
// const bodyParser = require('body-parser');

// App Setup
const app = express();



// Middleware
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); // had to add .engine after exphbs
app.set('view engine', 'handlebars');
app.set('views', './views');
// got it working again by moving the 2 lines below from above // Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set db
const db = require('./data/reddit-db');
require('./controllers/posts')(app); // had to move this here
require('./controllers/comments.js')(app);


// Routes
// app.get('/', (req, res) => {
//   res.send('Hello Reddit')
// })


/* code below from Braus' video */
// app.get('/', function (req, res) {
//   res.render('home');
// });

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

// CASES RESOURCE

// NEW
app.get('/cases/new', (req, res) => {
  res.render('cases-new', {});
})

// CREATE
// const Post = require('./models/post'); // had to change from '../models/post'

// module.exports = (app) => {
//   // CREATE
//   app.post('/posts/new', (req, res) => {
//     // INSTANTIATE INSTANCE OF POST MODEL
//     const post = new Post(req.body);

//     // SAVE INSTANCE OF POST MODEL TO DB AND REDIRECT TO THE ROOT
//     post.save(() => res.redirect('/'));
//   });
  
// };

// INDEX
// app.get('/', (req, res) => {
//   Post.find({}).lean()
//     .then((posts) => res.render('posts-index', { posts }))
//     .catch((err) => {
//       console.log(err.message);
//     })
// })

// SHOW
app.get('/cases/:id', (req, res) => {
  console.log(req.params.id);

  res.render('cases-show', { case: caseData })
});

// LOOK UP THE POST -- async/await  SHOW POST
// app.get('/posts/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id).lean();
//     return res.render('posts-show', { post });
//   } catch (err) {
//     console.log(err.message);
//   }
// });

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