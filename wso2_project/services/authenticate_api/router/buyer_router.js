const express = require('express');
const Router = express.Router();

const {getBuyers, addBuyer, updateBuyer, removeBuyer}  =  require('../controller/buyer_controller');

Router.get("/getBuyer",getBuyers);
Router.post("/addBuyer",addBuyer);
Router.put("/updateBuyer",updateBuyer);
Router.delete('/deleteBuyer',removeBuyer);

module.exports = Router;