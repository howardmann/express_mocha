var Model = require('objection').Model;

// Extends Model constructor.
function Movie() {
  Model.apply(this, arguments);
}

Model.extend(Movie);
module.exports = Movie;
// Table name is the only required property;
Movie.tableName = 'movies';

// This object defines the relations to other models
Movie.relationMappings = {
  user: {
    relation: Model.BelongsToOneRelation,
    modelClass: __dirname + '/User',
    join: {
      from: 'movies.user_id',
      to: 'users.id'
    }
  }
};
