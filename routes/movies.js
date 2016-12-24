var Movie = require('../models/Movie');
var _ = require('underscore');

exports.index = function(req, res, next) {
  Movie
    .query()
    .then(function(movies){

      res.json(movies);
    }, next)
};

exports.show = function(req, res, next) {
  Movie
    .query()
    .findById(req.params.id)
    .eager('user')
    .then(function(movie){
      var newUser = _.pick(movie.user, 'name', 'email');
      movie.user = newUser;
      res.json(movie);
    }, next)
};

exports.create = function(req, res, next) {
  Movie
    .query()
    .insertAndFetch(req.body)
    .then(function(movie){
      res.json(movie);
    }, next)
};

exports.update = function(req, res, next) {
  Movie
    .query()
    .updateAndFetchById(req.params.id, req.body)
    .then(function(movie){

      res.json(movie);
    }, next)
};

exports.destroy = function(req, res, next) {
  Movie
    .query()
    .findById(req.params.id)
    .then(function(movie){
      Movie
      .query()
      .deleteById(req.params.id)
      .then(function(){
        res.json(movie);
      });
    }, next)

};
