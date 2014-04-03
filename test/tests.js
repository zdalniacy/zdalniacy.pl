var app = require('../index');
var should = require('should');
var request = require('supertest').agent(app.listen());

describe('Loading Main Page', function(){
  it('should say "Hello World "', function(done){
    request
    .get('/')
    .expect(200)
    .end(function(err, res){
      if(err){
        throw err;
      }
      res.text.should.containEql("Hello World");
      done();

    });
  });
});

describe('Admin Page', function(){
  it('should show header "Admin Page"', function(done){
    request
    .get('/admin_panel/')
    .expect(200)
    .end(function(err, res){
      if(err){
        throw err;
      }
      done();

    });
  });
});

