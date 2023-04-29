const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const { ObjectId } = require('mongodb');

const sellerScema = new Schema({
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    fname : {
        type : String,
        require : true,
    },
    lname : {
        type : String,
        require : true,
    },
    phone : {
        type : String,
        require : true,
    },
    address : {
        type : String,
        require : true,
    }
},{
    timestamps : true
});

const seller = mongoose.model("Seller",sellerScema);
module.exports = seller;