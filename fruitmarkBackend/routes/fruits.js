const { Fruit } = require("../models/fruit");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const fruitList = await Fruit.find();

    if(!fruitList) {
        res.status(500).json({success: false})
    } 
    res.send(fruitList);
});

router.post(`/`, (req, res) => {
  const fruit = new Fruit({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  fruit
    .save()
    .then((createdFruit) => {
      res.status(201).json(createdFruit);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
