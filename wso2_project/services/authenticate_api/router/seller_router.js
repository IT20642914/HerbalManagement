const express = require('express');
const Router = express.Router();

const {getSellers, addSeller, updateSeller, removeSeller}  =  require('../controller/seller_controller');

Router.get("/getSeller",getSellers);
Router.post("/addSeller",addSeller);
Router.put("/updateSeller",updateSeller);
Router.delete('/deleteSeller',removeSeller);

module.exports = Router;