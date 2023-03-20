var express = require('express');
var router = express.Router();
const OrderModel = require('../../models/order-model');
// ta bort?
router.get('/', function(req, res, next) {
  res.send('Hello from orders Endpoint!');
});

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', function(req, res, next){
    res.send('Hello from orders/add Endpoint!');
});

// HÄMTA ALLA ORDERS
router.get('/all', async (req, res, next) =>{
    const order = await OrderModel.find()
});
module.exports = router;