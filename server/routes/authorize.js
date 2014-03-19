module.exports = function* authorizeMiddleware(next) {
  "use strict";

  if (this.req.isAuthenticated()) {
    yield next;
  } else {
    this.redirect('/login/');
  }
};