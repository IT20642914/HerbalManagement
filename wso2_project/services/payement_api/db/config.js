const url = require('url');

const praseUrl = url.parse(
    process.env.DB_STRING || "mongodb+srv://chathi:chathi@ds.yvk5rva.mongodb.net/herble?retryWrites=true&w=majority"
);

module.exports = {
    db : {
        host : praseUrl.hostname,
        port : parseInt(praseUrl.port,10),
        name : praseUrl.pathname.substr(1),
        user : praseUrl.auth ? praseUrl.auth.split(":")[0]:null,
        password : praseUrl.auth ? praseUrl.auth.split(":")[1] : null,
        url : praseUrl.href

    }
}