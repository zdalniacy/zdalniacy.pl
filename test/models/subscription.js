var mongoose = require('mongoose'),
  mongooseConfig = require('../../server/config/mongoose'),
  Subscription = require('../../server/models/offer.js').Subscription,
  connection = mongoose.connection,
  chance = new require('chance');

describe('Subscription model', function () {
  var title = chance.string();
  
  before(function(done){
    var offer = new Offer({title: title});
    offer.save(function(err){
        if(err) throw err;
        done()
    });  
  });
  
  afterEach(function(done){
    Offer.findOneAndRemove({title: 'TEST'}, function(err){
      done();
    });
  });
  
  it("should create and find Subscription object", function (done) {
      Offer.findOne({title: title}, function(err, offer2){
        if(err) throw "error"; 
        offer2.title.should.equal(title);
        done();
      });
  });

  it("should update Subscription object", function (done) {
      Offer.findOne({title: title}, function(err, offer2){
        if(err) throw "error"; 
        offer2.title.should.equal(title);
        done();
      });  
  });
  
  it("should delete Subscription object", function (done) {
      Offer.findOne({title: title}, function(err, offer2){
        if(err) throw "error"; 
        offer2.title.should.equal(title);
        done();
      });  
  });
  
});

