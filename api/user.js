var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "154.16.171.82",
    user: "admin",
    password: "HDy0c0QK",
    port: 18831,
    database: "snack"
});
var cus = {};
con.connect(function(err) {
    if (err) throw err;
});

router.post('/login', async function (req, res, next) {
    console.log(req.body.pass);
    const name = req.body.name;
    const pass = req.body.pass;
    await con.query("SELECT * FROM user where name=" + mysql.escape(name) + "and password = " + mysql.escape(pass),
        function (err, result, fields) {
            if (err) throw err;
            cus = result;
        });
    const result = await Object.values(JSON.parse(JSON.stringify(cus)));
    console.log(result.length > 0);
    if(result.length > 0)
    {
        res.send("1");
    }else {
        res.send("0");
    }
})

module.exports = router;
