const Admin = require('../model/admin_model');
const dbConnection = require('../db/dbConnection');
const {ObjectId} = require('mongodb');

const getAdmins = async (req, resp) => {
    try {
        const db = dbConnection.getDb();
        const result = await db.collection("Admin").find({}).toArray();
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Admin fetch Successfully",
            "data": result
        });
    } catch (error) {
        console.log("error on fetch Admin " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const addAdmin = async (req, resp) => {
    try {
        
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const newAdmins = new Admin({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Admin").insertOne(newAdmins);
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Admin Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on add Admin " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

const updateAdmin = async (req, resp) => {
    try {

        const _id = new ObjectId(req.body._id);
        const  email = req.body.email;
        const  password = req.body.password;
        const  fname = req.body.fname;
        const  lname = req.body.lname;
        const  phone = req.body.phone;
        const  address = req.body.address;

        const updateAdmins = new Admin({
            email,password,fname,lname,phone,address
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Admin").updateOne({_id},{updateAdmins});
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Admin update Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on update Admin " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

const removeAdmin = async (req, resp) => {
    try {
        
        const admin_id = new ObjectId(req.body.admin_id);

        const query = { _id: admin_id };

        const db = dbConnection.getDb();
        const result = await db.collection('Admin').deleteOne(query);

        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Admin Remove Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on remove Admin " + error.message);
        resp.json({
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

module.exports = {
    getAdmins,
    addAdmin,
    updateAdmin,
    removeAdmin
}