const { expressjwt: jwt } = require('express-jwt');

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
      { url: /\/api\/v1\/fruits(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/cities(.*)/, methods: ["GET", "OPTIONS"] },
      { url: `${api}/users/login`, methods: ["GET", "POST", "OPTIONS"] },
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
