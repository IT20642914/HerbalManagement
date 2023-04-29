const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
const { ObjectId } = require('mongodb');

const productScema = new Schema({
    titel : {
        type : String,
        require : true
    },
    availableQuntity : {
        type : Number,
        require : true
    },
    cat : {
        type : String,
        require : true
    },
    cover : {
        type : String,
        require : true
    },
    desc : {
        type : String,
        require : true,
    },
    price : {
        type : Number,
        require : true
    },
    shortDesc : {
        type : String,
        require : true,
    },
    seller_id : {
        type : ObjectId,
        require : true
    }

},{
    timestamps : true
});

const product = mongoose.model("Product",productScema);
module.exports = product;