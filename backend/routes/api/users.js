const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user-model');
const CryptoJS = require('crypto-js');

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', async (req, res) => { 
  const product = await UserModel.find()

  try {
  res.status(200).json(product);
  // res.send("test");

  } catch (err){
      console.error(err);
      res.status(500).send("Server Error")
  }
})

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET ska det vara post?
router.get('/:userId', function (req, res, next) {
  res.send('Hello from userId Endpoint!');
});

// SKAPA USER
router.post('/add', async (req, res, next) => {
  const user = new UserModel(req.body)
  let encryptPassword = req.body.password;
  encryptPassword = CryptoJS.AES.encrypt(user.password, "salt key").toString();
  user.password = encryptPassword;
  await user.save();

  try {
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error")
  }
})

// LOGGA IN USER
router.post('/login', function (req, res, next){
  res.send('Hello from login Endpoint!');
})
module.exports = router;


