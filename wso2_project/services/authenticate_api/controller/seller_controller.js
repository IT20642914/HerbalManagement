const Seller = require('../model/seller_model');
const dbConnection = require('../db/dbConnection');
const {ObjectId} = require('mongodb');

const getSellers = async (req, resp) => {
    try {
        const db = dbConnection.getDb();
        const result = await db.collection("Seller").find({}).toArray();
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Seller fetch Successfully",
            "data": result
        });
    } catch (error) {
        console.log("error on fetch Seller " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const addSeller = async (req, resp) => {
    try {
        
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const newSeller = new Seller({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Seller").insertOne(newSeller);
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Seller Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on add Seller " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const updateSeller = async (req, resp) => {
    try {

        const _id = new ObjectId(req.body._id);
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const updateSellers = new Seller({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Seller").updateOne({_id},{updateSellers});
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Seller update Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on update Seller " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

const removeSeller = async (req, resp) => {
    try {
        
        const buyer_id = new ObjectId(req.body.buyer_id);

        const query = { _id: buyer_id };

        const db = dbConnection.getDb();
        const result = await db.collection('Seller').deleteOne(query);

        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Seller Remove Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on remove Seller " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

module.exports = {
    getSellers,
    addSeller,
    updateSeller,
    removeSeller
}