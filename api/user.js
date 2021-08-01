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
    console.log(req.body);
    const name = req.body.name;
    const pass = req.body.pass;
    await con.query("SELECT * FROM user where name=" + mysql.escape(name) + " and password = " + mysql.escape(pass),
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
});
router.post('/highscore', async function (req, res, next) {
    console.log(req.body);
    const name = req.body.name;
    const pass = req.body.pass;
    const score = req.body.score;

    let re = {};
    await con.query("SELECT score FROM user where name=" + mysql.escape(name) + " and password = " + mysql.escape(pass),
        await function (err, result, fields) {
            if (err) throw err;
            //console.log(result[0].score, '------');
            re = result[0];
            res.send(re);
            if(re.score < score){
                con.query("update user set score = " + mysql.escape(score) + " where name=" + mysql.escape(name) + " and password = " + mysql.escape(pass),
                     function (err, result, fields) {
                        if (err) throw err;
                        console.log(result, '------');
                    });
            }
        });
});

module.exports = router;
