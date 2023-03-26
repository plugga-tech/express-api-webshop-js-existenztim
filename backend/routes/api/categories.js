const express = require('express');
const router = express.Router();
require('dotenv').config();

const categoryKey = process.env.CAT_TOKEN;
const CategoryModel = require('../../models/category-model');

router.get('/', async (req, res) =>{
   try {
    const category = await CategoryModel.find()
    res.status(200).json(category);
   } catch (err) {
    console.error(err);
    res.send(500).send([])
   }
  });

router.post('/add', async (req, res) => {
    const token = req.body.token;
    if (token !== categoryKey) {
        res.status(401).json({ msg: "Unauthorized" });
    }
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        return res.status(201).send(category);
    } catch(err) {
        console.error(err);
        return res.status(500).send(err);
    }
});

module.exports = router;