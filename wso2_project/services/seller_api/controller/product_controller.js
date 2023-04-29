const Product = require('../model/product_model');
const dbConnection = require('../db/dbConnection');
const { ObjectId } = require('mongodb');


const getProduct = async (req, resp) => {
    try {

        const db = dbConnection.getDb();
        const result = await db.collection("Product").find({}).toArray();
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Product fetch Successfully",
            "data": result
        });


    } catch (error) {
        console.log("error on fetch product " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const addProduct = async (req, resp) => {
    try {     
        const cover = "/assert/"+req.file.filename;
        const  titel = req.body.titel;
        const availableQuntity = req.body.availableQuntity;
        const  cat = req.body.cat;
        const desc = req.body.desc;
        const price = req.body.price;
        const shortDesc = req.body.shortDesc;
        const seller_id = new ObjectId(req.body.seller_id);


        const newProduct = new Product({
            titel,availableQuntity,cat,cover,desc,price,shortDesc,seller_id
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Product").insertOne(newProduct);
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Product Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on add product " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const updateProduct = async (req, resp) => {
    try {
        const _id = new ObjectId(req.body._id);
        const cover = "/assert/"+req.file.filename;
        const  titel = req.body.titel;
        const availableQuntity = req.body.availableQuntity;
        const  cat = req.body.cat;
        const desc = req.body.desc;
        const price = req.body.price;
        const shortDesc = req.body.shortDesc;
        const seller_id = new ObjectId(req.body.seller_id);

        const updateProduct = new Product({
            titel,availableQuntity,cat,cover,desc,price,shortDesc,seller_id
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Product").updateOne({_id},{updateProduct});
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Product Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on update product " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const removeProduct = async (req, resp) => {
    try {
        
        const product_id = new ObjectId(req.body.product_id);

        const query = { _id: product_id };

        const db = dbConnection.getDb();
        const result = await db.collection('Product').deleteOne(query);

        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Product Remove Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on remove product " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    removeProduct
}