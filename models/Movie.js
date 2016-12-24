var Model = require('objection').Model;

// Extends Model constructor.
function Movie() {
  Model.apply(this, arguments);
}

Model.extend(Movie);
module.exports = Movie;
// Table name is the only required property;
Movie.tableName = 'movies';

// Model logic is created via virtual attributes using the prototype property and then referencing it as a an array of virtualAttributes
Movie.virtualAttributes = ['period', 'rating'];

Movie.prototype.period = function(){
  if (this.year >= 2000) {
    return 'post millennium';
  } else {
    return 'pre millennium';
  }
};

Movie.prototype.rating = function(){
  if (this.genre === 'Action') {
    return 'OMG THE BEST';
  } else {
    return 'Gaaaayy';
  }
};

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
