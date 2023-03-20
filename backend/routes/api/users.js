var express = require('express');
var router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res, next) {
  res.send('Hello from users Endpoint!');
});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET ska det vara post?
router.get('/:userId', function (req, res, next) {
  res.send('Hello from userId Endpoint!');
});

// SKAPA USER
router.post('/add', function (req, res, next){
  res.send('Hello from add Endpoint!');
})

// LOGGA IN USER
router.post('/login', function (req, res, next){
  res.send('Hello from login Endpoint!');
})
module.exports = router;


