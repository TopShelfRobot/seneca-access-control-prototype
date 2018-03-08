
const hasPermission = perm => msg => msg.auth && msg.auth.permissions && msg.auth.permissions.includes(perm);

module.exports = function(options) {

  this.add({cmd: 'work'}, function(msg, done) {
    if (hasPermission('can-work')(msg)) {
      this.prior(msg, done);
    } else {
      done(new Error("No Access to Work, Yo!"));
    }
  });

  this.add({cmd: 'dance'}, function(msg, done) {
    if (hasPermission('can-dance')(msg)) {
      this.prior(msg, done);
    } else {
      done(new Error("No Access to Dance, Yo!"));
    }
  });

  this.add({cmd: 'dunk'}, function(msg, done) {
    if (hasPermission('can-dunk')(msg)) {
      this.prior(msg, done);
    } else {
      done(new Error("No Access to dunk, Yo!"));
    }
  });

}