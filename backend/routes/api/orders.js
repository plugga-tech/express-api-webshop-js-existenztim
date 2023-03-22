var express = require('express');
var router = express.Router();
const OrderModel = require('../../models/order-model');
const ProductModel = require('../../models/product-model');


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
// HÄMTA ALLA ORDERS
router.get('/all', async (req, res, next) =>{
    try {
      const order = await OrderModel.find()
      res.status(200).json(order)
    } catch (err){
      console.error(err);
      res.status(500).json({ msg: err });
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