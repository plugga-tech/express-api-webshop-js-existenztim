var express = require('express');
var router = express.Router();
const ProductModel = require('../../models/product-model');
// HÄMTA ALLA PRODUKTER
router.get('/', async (req, res, next) => {
  const product = await ProductModel.find()

  try {
    res.status(200).json(product);
  } catch (err){
    console.error(err);
    res.status(500).send("Server Error")
  }
});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    try {
        res.status(200).json(product)
    } catch (err){
        console.error(err);
        res.status(500).send("Server Error")
    }
})

// SKAPA PRODUKT
router.post('/add', async (req, res, next) => {
    const product = new ProductModel(req.body)
    await product.save();

    try {
        res.status(201).json(product);
    } catch(err){
        console.error(err);
        res.status(500).send("Server Error")
    }
})
module.exports = router;