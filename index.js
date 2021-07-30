const express = require("express");
const app = express();
const product = require("./api/product");
var mysql = require('mysql');
var router = express.Router();
var con = mysql.createConnection({
    host: "154.16.171.82",
    user: "admin",
    password: "HDy0c0QK",
    port: 18831,
    database: "snack"
});
app.use(express.json({ extended: false }));

app.use("/api/product", product);
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM user", function (err, result, fields) {
        if (err) throw err;
        cus = result;
    });
});
app.use('/users', function(req, res, next) {
    res.send(cus);
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
