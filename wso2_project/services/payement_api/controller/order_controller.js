const Order = require('../model/oder_model');
const OrderItem = require('../model/order_item_model');
const dbConnection = require('../db/dbConnection');
const {ObjectId} = require('mongodb');

const getOrder = async (req, resp) => {
    try {
        const db = dbConnection.getDb();
        const result = await db.collection("Order").find({}).toArray();
        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Order fetch Successfully",
            "data": result
        });
    } catch (error) {
        console.log("error on fetch Orders " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
} 

const addOrder = async (req, resp) => {
    try {
        const order_item = req.body.itemList;
        const totatAmount = req.body.totatAmount;
        const subTotal =  req.body.subTotal;
        const numofItem =  order_item.length;
        const orderDate = req.body.orderDate;

        const newOrder = new Order({
            totatAmount,subTotal,numofItem,orderDate
        });

        const db = dbConnection.getDb();

        const result = await db.collection("Order").insertOne(newAdmins);

        order_item.map(async (item)=>{
            const itemName = item.itemName;
            const itemImage = item.itemImage;
            const itemPrice = item.itemPrice;
            const Qty = item.Qty;
            const orderId = result.data.insertedId;
            const neworderItem = new OrderItem({
                itemName,itemImage,itemPrice,Qty,orderId
            });

            const results = await db.collection("OrderItem").insertOne(neworderItem);
        });

        resp.json({
            "code": 200,
            "status": "SUCCESS",
            "message": "Order Added Successfully",
            "data": result
        });

    } catch (error) {
        console.log("error on add Orders " + error.message);
        return (resp.body = {
            "code": 400,
            "status": "ERROR",
            "message": error.message,
            "data": []
        });
    }
}

