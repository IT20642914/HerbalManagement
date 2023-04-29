const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const { ObjectId } = require('mongodb');

const paymentSceama = new Schema({
    order_number : {
        type : ObjectId,
        require : true,
    },
    amount : {
        type : Number,
        require : true
    },
    cvv : {
        type : Number,
        require : true
    },
    card_number : {
        type : Number,
        require : true
    },
    expire_date : {
        type : Date,
        require : true
    },
    holder_name : {
        type : String,
        require : true
    },
},{timestamps : true});

const payment = mongoose.model("Payment",paymentSceama);
module.exports = payment;