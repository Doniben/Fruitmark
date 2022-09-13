const {City} = require('../models/city');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const cityList = await City.find();

    if(!cityList) {
        res.status(500).json({success: false})
    } 
    res.send(cityList);
})

module.exports =router;