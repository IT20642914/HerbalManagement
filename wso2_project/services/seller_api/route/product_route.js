const express = require('express');
const Router = express.Router();
const {getProduct,addProduct,updateProduct,removeProduct} = require('../controller/product_controller'); 


Router.get("/getProduct",getProduct);
Router.post("/addProduct",addProduct);
Router.put("/updateProduct",updateProduct);
Router.delete('/deleteProduct',removeProduct);



module.exports = Router;