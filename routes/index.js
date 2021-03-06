var express = require('express');
var router = express.Router();

var users = require('./users.js');
var posts = require('./posts.js');
var movies = require('./movies.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express-Boilerplate' });
});

// USERS CRUD SERVER-SIDE FORMAT
router
  .get('/users', users.index)
  .get('/users/new', users.new)
  .post('/users', users.create)
  .get('/users/:id', users.show)
  .get('/users/:id/edit', users.edit)
  .put('/users/:id', users.update)
  .delete('/users/:id', users.destroy);

// POSTS CRUD API FORMAT
router
  .get('/posts', posts.index)
  .post('/posts', posts.create)
  .get('/posts/:id', posts.show)
  .put('/posts/:id', posts.update)
  .delete('/posts/:id', posts.destroy);

// USER NESTED ROUTES
router
  .get('/users/:id/posts/new', posts.newUser)
  .post('/users/:id/posts', posts.createUser);

// MOVIES ROUTES
router
  .get('/movies', movies.index)
  .get('/movies/:id', movies.show)
  .post('/movies', movies.create)
  .put('/movies/:id', movies.update)
  .delete('/movies/:id', movies.destroy);



module.exports = router;
