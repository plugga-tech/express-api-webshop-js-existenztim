const express = require('express');
const router = express.Router();
require('dotenv').config();

const productKey = process.env.PROD_TOKEN;
const ProductModel = require('../../models/product-model');
const CategoryModel = require('../../models/category-model');

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

// HÄMTA ALLA PRODUKTER FÖR EN SPECIFIK KATEGORI
router.get('/category/:id', async (req, res) =>{
  try {
      const category = await CategoryModel.findById(req.params.id)
      const products = await ProductModel.find({category: category}) //fix this line so it adds all products with category in req.params.id
      res.status(200).json(products);
  } catch (err) {
      console.error(err);
      res.send(500).send([])
  }
  });

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