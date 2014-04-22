var Offer = require('../../models/offer.js');

function * offerList() {
  this.body = yield Offer.find().sort('-title').exec();
}

module.exports = {
  offerList: offerList
};
