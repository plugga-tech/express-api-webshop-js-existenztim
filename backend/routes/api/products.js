const express = require('express');
const router = express.Router();
require('dotenv').config();

const productKey = process.env.CREATE_TOKEN;
const ProductModel = require('../../models/product-model');

// HÄMTA ALLA PRODUKTER
router.get('/', async (req, res, next) => {
  try {
    const product = await ProductModel.find()
    res.status(200).json(product);
  } catch (err){
    console.error(err);
    res.status(500).send([])
  }
});

// HÄMTA SPECIFIK PRODUKT
router.get('/:id', async (req, res) => {
    const product = await ProductModel.findById({_id: req.params.id})
    try {
        res.status(200).json(product)
    } catch (err){
        console.error(err);
        res.status(500).json({ msg: err });
    }
})

// SKAPA PRODUKT // UTAN TOKEN SÅ SKALL ANROPET MISSLYCKAS = 401
router.post('/add', async (req, res, next) => {
  const token = req.body.token;
  if (token !== productKey) {
      res.status(401).json({ msg: "Unauthorized" });
  } else {
      const product = new ProductModel(req.body);
      await product.save();

      try {
          res.status(201).json(product);
      } catch(err){
          console.error(err);
          res.status(500).json({ msg: err });
      }
  }
})
module.exports = router;