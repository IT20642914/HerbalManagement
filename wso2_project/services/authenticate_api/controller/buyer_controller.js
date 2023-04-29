const Buyer = require('../model/buyer_model');
const dbConnection = require('../db/dbConnection');
const {ObjectId} = require('mongodb');

const getBuyers = async (req, resp) => {
    try {
        const db = dbConnection.getDb();
        const result = await db.collection("Buyer").find({}).toArray();
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Buyer fetch Successfully",
            "data": result
        });
    } catch (error) {
        console.log("error on fetch buyer " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const addBuyer = async (req, resp) => {
    try {
        
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const newBuyer = new Buyer({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Buyer").insertOne(newBuyer);
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Buyer Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on add buyer " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const updateBuyer = async (req, resp) => {
    try {

        const _id = new ObjectId(req.body._id);
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const updateBuyer = new Buyer({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Buyer").updateOne({_id},{updateBuyer});
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Buyer update Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on update buyer " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

const removeBuyer = async (req, resp) => {
    try {
        
        const buyer_id = new ObjectId(req.body.buyer_id);

        const query = { _id: buyer_id };

        const db = dbConnection.getDb();
        const result = await db.collection('Buyer').deleteOne(query);

        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Buyer Remove Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on remove Buyer " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

module.exports = {
    getBuyers,
    addBuyer,
    updateBuyer,
    removeBuyer
}