var express = require('express');
var router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get('/', function(req, res, next) {
  res.send('Hello from products Endpoint!');
});

// HÄMTA SPECIFIK PRODUKT
router.get('/:productId', function(req,res, next){
    res.send('Hello from products/:productId Endpoint!');
})

// SKAPA PRODUKT
router.post('/add', function (req, res, next){
    res.send('Hello from products/add Endpoint!');
})
module.exports = router;