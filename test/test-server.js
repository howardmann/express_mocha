var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js');
var expect = chai.expect;
var should = chai.should();

var config = require('../knexfile')[process.env.NODE_ENV || "development"];
var knex = require("knex")(config);

chai.use(chaiHttp);

describe('Movies', function() {

  // Before each test we rollback the migrations and run the seed file again
  beforeEach(function(done) {
    knex.migrate.rollback()
    .then(function() {
      knex.migrate.latest()
      .then(function() {
        return knex.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  it('should list ALL movies on /movies GET', function(done){
    chai.request(app)
      .get('/movies')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length(4);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Gladiator');
        res.body[0].should.have.property('director');
        res.body[0].director.should.equal('Ridley Scott');
        res.body[0].should.have.property('genre');
        res.body[0].genre.should.equal('Drama');
        res.body[0].should.have.property('year');
        res.body[0].year.should.equal(2000);
        res.body[0].should.have.property('period');
        res.body[0].period.should.equal('post millennium');
        done();
      });
  });

  it('should list a SINGLE movie on /movie/:id GET', function(done){
    chai.request(app)
      .get('/movies/2')
      .end(function(err, res){
        // For illustartion purposes different style using expect. Should and expect are both fine
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.equal('Prestige');
        expect(res.body).to.have.property('director');
        expect(res.body.director).to.equal('Christopher Nolan');
        expect(res.body).to.have.property('genre');
        expect(res.body.genre).to.equal('Drama');
        expect(res.body).to.have.property('year');
        expect(res.body.year).to.equal(2013);
        // Add associations for movie belongs to user
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.be.a('object');
        expect(res.body.user).to.have.property('name');
        expect(res.body.user.name).to.equal('howie mann');
        expect(res.body.user).to.have.property('email');
        expect(res.body.user.email).to.equal('howie@email.com');
        done();
      });
  });

  it('should add a SINGLE movie on /movies POST', function(done){
    chai.request(app)
      .post('/movies')
      .send({
        name: 'The Avengers',
        director: 'Joss Whedon',
        genre: 'Action',
        year: 2012
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('The Avengers');
        res.body.should.have.property('director');
        res.body.director.should.equal('Joss Whedon');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Action');
        res.body.should.have.property('year');
        res.body.year.should.equal(2012);
        done();
      });
  });

  it('should update a SINGLE movie on /movies/:id PUT', function(done){
    chai.request(app)
      .put('/movies/1')
      .send({
        genre: 'Action'
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Gladiator');
        res.body.should.have.property('director');
        res.body.director.should.equal('Ridley Scott');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Action');
        res.body.should.have.property('year');
        res.body.year.should.equal(2000);
        done();
      });
  });

  it('should delete a SINGLE movie on /movies/:id DELETE', function(done){
    chai.request(app)
      .delete('/movies/4')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Pulp Fiction');
        res.body.should.have.property('director');
        res.body.director.should.equal('Quentin Tarantino');
        res.body.should.have.property('genre');
        res.body.genre.should.equal('Noir');
        res.body.should.have.property('year');
        res.body.year.should.equal(1990);
        chai.request(app)
          .get('/movies')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.equal(3);
            done();
          });
      });
  });

});
