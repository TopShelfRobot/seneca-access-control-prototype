const Seneca = require('seneca');
const PEP = require('./accessControl');

const service = Seneca();

service.add('cmd:work', (msg, done) => {
  done(null, {msg: "Look at me! I'm doing work!"});
});

service.add('cmd:dance', (msg, done) => {
  done(null, {msg: "I'm a dancing fool!"});
});

service.add('cmd:dunk', (msg, done) => {
  done(null, {msg: "I can be like Mike!"});
});

// Order is important. This must go last.
service.use(PEP);
// For an easier-to-read log
service.test();

function handler(err, reply) {
  const errMsg = err ? err.message : null;
  console.log(errMsg, reply);
}


const auth = {
  userId: 123,
  permissions: ['can-work', 'can-dance']
};

const workMsg = {cmd: 'work', auth};
const danceMsg = {cmd: 'dance', auth};
const dunkMsg = {cmd: 'dunk', auth};

service.gate();

console.log("Auth:", auth);
['work', 'dance', 'dunk'].forEach(cmd => {
  console.log(`Command: ${cmd}`);
  service.act({cmd, auth}, handler);
})

service.ungate();