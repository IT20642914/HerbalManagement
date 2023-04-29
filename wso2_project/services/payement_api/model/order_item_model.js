const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const { ObjectId } = require('mongodb');

const orderItemSchema = new Schema({
    itemName : {
        type : String,
        require : true,
    },
    itemImage : {
        type : String,
        require : true,
    },
    itemPrice : {
        type : Number,
        require : true,
    },
    Qty : {
        type : Number,
        require : true,
    },
    orderId : {
        type : ObjectId,
        require : true
    }

},{
    timestamps : true
});

const orderItem = mongoose.model("OrderItem",orderItemSchema);
module.exports = orderItem;