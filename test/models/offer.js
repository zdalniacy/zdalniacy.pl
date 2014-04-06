var mongoose = require('mongoose'),
  mongooseConfig = require('../../server/config/mongoose'),
  Offer = require('../../server/models/offer.js'),
  connection = mongoose.connection,
  chance = require('chance').Chance();

describe('Offer model', function () {
  
  afterEach(function(done){
    Offer.findOneAndRemove({title: 'TEST'}, function(err){
      done();
    });
  });
  
  it("should create and find Offer object", function (done) {
    var title = chance.string();
    var offer = new Offer({title: title});
    offer.save(function(err){
        if(err) throw err;
        Offer.findOne({title: title}, function(err, offer2){
          if(err) throw "error"; 
          offer2.title.should.equal(title);
          done();
        });
    });
    
  });

  it("should update Offer object", function (done) {
    done();
  });
  
  it("should delete Offer object", function (done) {
    done();
  });
  
});