var express = require('express');
var router = express.Router();

// ta bort?
router.get('/', function(req, res, next) {
  res.send('Hello from orders Endpoint!');
});

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', function(req, res, next){
    res.send('Hello from orders/add Endpoint!');
});

router.get('/all', function (req, res, next){
    res.send('Hello from orders/all Endpoint!');
});
module.exports = router;