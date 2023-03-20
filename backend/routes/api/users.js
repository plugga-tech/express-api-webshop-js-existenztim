const express = require('express');
const router = express.Router();
const UserModel = require('../../models/user-model');
const CryptoJS = require('crypto-js');

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', async (req, res) => { 
  const user = await UserModel.find({}, {name:1, email:1})

  try {
  res.status(200).json(user);
  // res.send("test");

  } catch (err){
      console.error(err);
      res.status(500).send("Server Error")
  }
})

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET ska det vara post?
router.post('/', async (req, res, next) => {
  const { id } = req.body;
  const user = await UserModel.findById({_id: id})

  try{
    res.status(200).json(user);
  } catch (err){
    console.error(err);
    res.status(500).send("Server Error")
  }
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
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    //decrypt password
    let decryptPassword = CryptoJS.AES.decrypt(user.password, "salt key").toString(CryptoJS.enc.Utf8);
    if (password === decryptPassword) {
      res.status(200).json(user);
    } else {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;


