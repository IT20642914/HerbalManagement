const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const { ObjectId } = require('mongodb');

const orderSchema = new Schema({
    totatAmount : {
        type : Number,
        require : true,
    },
    subTotal : {
        type : Number,
        require : true,
    },
    numofItem : {
        type : Number,
        require : true,
    },
    orderDate : {
        type : Date,
        require : true,
    },

},{
    timestamps : true
});

const order = mongoose.model("Order",orderSchema);
module.exports = order;