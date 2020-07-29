var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var config = require("./config"); // config.js
var app = express();
var cors = require("cors");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());


var pool = mysql.createPool({
            // config.js에 있는 정보를 바탕으로 연결
            host: config.mysql.host,
            port: config.mysql.port,
            user: config.mysql.username,
            password: config.mysql.password,
            database: config.mysql.db,
            connectionLimit:20,
	    multipleStatements: true,
            waitForConnections:false
        });


app.listen(config.port, function() {
    console.log("Server listening on port %d", config.port);
});


var routes = require("./routes")(app, pool);

