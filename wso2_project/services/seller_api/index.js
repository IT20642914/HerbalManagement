const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const express = require("express");
const dotenv = require('dotenv');
const http = require("http");
const multer = require('multer');

var storage = multer.diskStorage({    //frntend eken ena request object eka,file,return value
    destination: function (req, file, cb) {
    cb(null, './assert')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage });

var types = upload.single('file');

const seller_route = require('./route/product_route');

const dbConnection = require('./db/dbConnection');

const PORT = process.env.PORT || 8000;

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => res.send('Its working!'));


app.use("/products",types,seller_route);


dbConnection.getInstace().then((connection)=>{
    const server = http.createServer(app);

    server.listen(PORT,()=>{
        const serv = server.address();
        console.log(`seller service  server running at ${serv.address} address and port number ${serv.port}, API is up`)
    });
}).catch((err)=>{
    console.log("error : "+err);
    process.exit(1);
});

