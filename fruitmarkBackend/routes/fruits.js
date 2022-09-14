const { Fruit } = require("../models/fruit");
const express = require("express");
const router = express.Router();

const { City } = require("../models/city");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

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

router.post(`/`, uploadOptions.single("image"), async (req, res) => {
  const city = await City.findById(req.body.city);
  if (!city) return res.status(400).send("Invalid City");

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  let fruit = new Fruit({
    name: req.body.name,
    image: `${basePath}${fileName}`,
    city: req.body.city,
    countInStock: req.body.countInStock,
  });

  fruit = await fruit.save();

  if (!fruit) return res.status(500).send("The fruit cannot be created");

  res.send(fruit);
});

router.put("/:id", uploadOptions.single("image"), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Fruit Id");
  }
  const city = await City.findById(req.body.city);
  if (!city) return res.status(400).send("Invalid City");

  const fruit = await Fruit.findById(req.params.id);
    if (!fruit) return res.status(400).send('Invalid Product!');

  const file = req.file;
  let imagepath;

  if (file) {
    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagepath = `${basePath}${fileName}`;
  } else {
    imagepath = fruit.image;
  }
  const updatedFruit = await Fruit.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: imagepath,
      city: req.body.city,
      countInStock: req.body.countInStock,
    },
    { new: true }
  );

  if (!updatedFruit)
    return res.status(500).send("the fruit cannot be updated!");

  res.send(updatedFruit);
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


//! Not yet working

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    const fruit = await Fruit.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    );

    if (!fruit) return res.status(500).send("the gallery cannot be updated!");

    res.send(fruit);
  }
);

module.exports = router;
