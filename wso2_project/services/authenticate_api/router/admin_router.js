const express = require('express');
const Router = express.Router();

const {getAdmins, addAdmin, updateAdmin, removeAdmin}  =  require('../controller/admin_controller');

Router.get("/getAdmin",getAdmins);
Router.post("/addAdmin",addAdmin);
Router.put("/updateAdmin",updateAdmin);
Router.delete('/deleteAdmin',removeAdmin);

module.exports = Router;