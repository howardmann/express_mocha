var Model = require('objection').Model;

// Extends Model constructor.
function Movie() {
  Model.apply(this, arguments);
}

Model.extend(Movie);
module.exports = Movie;

// Table name is the only required property;
Movie.tableName = 'movies';
