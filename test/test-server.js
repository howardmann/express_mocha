var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('Movies', function() {
  it('should list ALL movies on /movies GET');
  it('should list a SINGLE movie on /movie/:id GET');
  it('should add a SINGLE movie on /movies POST');
  it('should update a SINGLE movie on /movies/:id PUT');
  it('should delete a SINGLE movie on /movies/:id DELETE');
});
