const mongoose = require("mongoose");

const fruitSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

exports.Fruit = mongoose.model("Fruit", fruitSchema);
