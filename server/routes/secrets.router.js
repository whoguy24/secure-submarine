const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated, } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);
  const values = [ req.user.clearance_level ]
  const text = `      
    SELECT * FROM "secret"
    WHERE "secrecy_level" <= $1
  ;`
  pool
    .query( text, values )
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
