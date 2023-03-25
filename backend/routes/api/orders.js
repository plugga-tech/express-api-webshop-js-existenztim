const express = require('express');
const router = express.Router();
const OrderModel = require('../../models/order-model');
const ProductModel = require('../../models/product-model');
require('dotenv').config();

let apiKey = process.env.API_KEY;

// router.get('/', function(req, res, next) {
//   res.send('Hello from orders Endpoint!');
// });

// SKAPA ORDER FÖR EN SPECIFIK USER // PRODUCTS ÄR EN ARRAY MOTSVARANDE INNEHÅLLET I KUNDVAGN
router.post('/add', async (req, res, next) => {
  const order = new OrderModel(req.body)
  try {
    //KONTROLLERA LAGER
    await order.products.forEach(async (product) => {
      const productDocument = await ProductModel.findById(product.productId);
      productDocument.lager -= product.quantity;
      await productDocument.save();
    });
    await order.save();
    res.status(200).json(order);
    } catch(err){
    console.error(err);
    res.status(500).json({ msg: err });
  }
});
// HÄMTA ALLA ORDERS, KEY MÅSTE ANGES FÖR ATT FÅ TILLGÅNG TILL ORDERS
router.get('/all/:api', async (req, res, next) =>{
  const api = req.params.api;

  if (api === apiKey) {
    try {
      const order = await OrderModel.find()
      res.status(200).json(order)
    } catch (err){
      console.error(err);
      res.status(500).json({ msg: err });
    }
  }
  else {
    res.status(401).json({msg: 'Unauthorized API request'})
  }
});

// TÖM ORDERS (Endast under utvecklingsfas)
router.delete('/all', async (req, res, next) =>{
  try {
    const order = await OrderModel.deleteMany()
    res.status(200).json(order)
  } catch (err){
    console.error(err);
    res.status(500).json({ msg: err });
  }
});
module.exports = router;