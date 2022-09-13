const { Fruit } = require("../models/fruit");
const express = require("express");
const router = express.Router();

const { City } = require("../models/city");
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  // localhost:3000/api/v1/fruits?cities=2342342,234234
  let filter = {};
  if (req.query.cities) {
    filter = { city: req.query.cities.split(",") };
  }

  const fruitList = await Fruit.find(filter).populate("city");

  if (!fruitList) {
    res.status(500).json({ success: false });
  }
  res.send(fruitList);
});

router.get(`/:id`, async (req, res) => {
  const fruit = await Fruit.findById(req.params.id).populate("city");

  if (!fruit) {
    res.status(500).json({ success: false });
  }
  res.send(fruit);
});

router.post(`/`, async (req, res) => {
  const city = await City.findById(req.body.city);
  if (!city) return res.status(400).send("Invalid City");

  let fruit = new Fruit({
    name: req.body.name,
    image: req.body.image,
    city: req.body.city,
    countInStock: req.body.countInStock,
  });

  fruit = await fruit.save();

  if (!fruit) return res.status(500).send("The fruit cannot be created");

  res.send(fruit);
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Fruit Id");
  }
  const city = await City.findById(req.body.city);
  if (!city) return res.status(400).send("Invalid City");

  const fruit = await Fruit.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      city: req.body.city,
      countInStock: req.body.countInStock,
    },
    { new: true }
  );

  if (!fruit) return res.status(500).send("the fruit cannot be updated!");

  res.send(fruit);
});

router.delete("/:id", (req, res) => {
  Fruit.findByIdAndRemove(req.params.id)
    .then((fruit) => {
      if (fruit) {
        return res
          .status(200)
          .json({ success: true, message: "the fruit was deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "fruit not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const fruitCount = await Fruit.countDocuments((count) => count);

  if (!fruitCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    fruitCount: fruitCount,
  });
});

module.exports = router;
