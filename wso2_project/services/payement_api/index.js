const bodyParser = require("body-parser");
const cors = require("cors");
const { connect } = require("mongoose");
const express = require("express");
const dotenv = require('dotenv');
const http = require("http");

const dbConnection = require('./db/dbConnection');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => res.send('Its working!'));

dbConnection.getInstace().then((connection)=>{
    const server = http.createServer(app);

    server.listen(PORT,()=>{
        const serv = server.address();
        console.log(`payement service  server running at ${serv.address} address and port number ${serv.port}, API is up`)
    });
}).catch((err)=>{
    console.log("error : "+err);
    process.exit(1);
});