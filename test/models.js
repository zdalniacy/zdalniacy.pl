var mongoose = require('mongoose'),
  mongooseConfig = require('../server/config/mongoose'),
  Offer = require('../server/models/offer.js').Offer,
  Subscription = require('../server/models/offer.js').Subscription,
  connection = mongoose.connection;

var config = {db: 'mongodb://localhost/test'};
mongooseConfig(config);

describe('mongoose config', function () {

  it("should setup connection to database", function (done) {
    connection.once('open', function () {
      done();
    });
  });

});

describe('Offer model', function () {
  
  afterEach(function(done){
    Offer.findOneAndRemove({title: 'TEST'}, function(err){
      done();
    });
  });
  
  it("should create Offer object", function (done) {
    var offer = new Offer({title: 'TEST'});
    offer.save();
    
    Offer.findOne({title: 'TEST'}, function(err, offer2){
      if(err) throw "error"; 
      offer2.title.should.equal('TEST');
      
      done();
    });

  });
  
  it("should find Offer object", function (done) {
    done()
  });

  it("should update Offer object", function (done) {
    done()
  });
  
  it("should delete Offer object", function (done) {
    done()
  });
  
});

describe('Subscription model', function () {

  it("should create Subscription object", function (done) {
    done()
  });
  
  it("should find Subscription object", function (done) {
    done()
  });

  it("should update Subscription object", function (done) {
    done()
  });
  
    
  it("should delete Subscription object", function (done) {
    done()
  });
  
});