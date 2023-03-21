var express = require('express');
var router = express.Router();
const OrderModel = require('../../models/order-model');
// ta bort?
router.get('/', function(req, res, next) {
  res.send('Hello from orders Endpoint!');
});

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', async (req, res, next) => {
    const order = new OrderModel(req.body)
    try {
      await order.save();

        // Update products quantity in stock here       
      } catch(err){
      console.error(err);
      res.status(500).send("Server Error")
    }
});

// HÄMTA ALLA ORDERS
router.get('/all', async (req, res, next) =>{
    try {
      const order = await OrderModel.find()
      res.status(200).json(order)
    } catch (err){
      console.error(err);
      res.status(500).send("Server Error")
    }
});
module.exports = router;