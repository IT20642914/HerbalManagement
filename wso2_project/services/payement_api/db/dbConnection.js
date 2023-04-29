const MongoClients = require("mongodb").MongoClient;
const config = require('./config');


module.exports = (function (){
    let connectionInstace;
    let db;

    function getInstace(){
        return new Promise((resolve, reject) => {
            if(connectionInstace){
                return resolve(connectionInstace)
            }

            const options = {
                useNewUrlParser: true
            }
            MongoClients.connect(config.db.url,{useNewUrlParser: true}).then((client)=>{
                console.log("MongoDb connection SuccessFully");
                connectionInstace = client;
                db = client.db(config.db.name);

                return resolve(connectionInstace);
            }).catch((err)=>{
                return reject(err)
            })

        })
    }

    function getDb(){
        if(!db){
            throw new Error("Db object not initialized! pleace inizialize db before use");
        }

        return db;
    }

    return {
        getInstace,
        getDb
    }

})();