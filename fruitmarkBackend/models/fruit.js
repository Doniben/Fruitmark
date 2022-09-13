const mongoose = require('mongoose');

const fruitSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

exports.Fruit = mongoose.model('Fruit', fruitSchema);
