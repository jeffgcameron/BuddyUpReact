const express = require("express")
const cors = require("cors")

const mysql = require("mysql")
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require('bcrypt');
const { response } = require("express");

app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createPool({
    user:           "root",
    host:           "localhost",
    password:       "root",
    database:       "BUdb"
});

// activities routes

app.get('/api/get-activites', (req, res) => {
    const sqlSelect = "Select * FROM activities";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/activites', (req, res) => {

    const activityName      = req.body.activityName
    const location          = req.body.location
    const plan              = req.body.plan
    const time              = req.body.time
    const date              = req.body.date
    const buddies           = req.body.buddies

    const sqlInsert = "INSERT INTO activities (name, location, plan, time, date, buddies) VALUES (?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert, [activityName, location, plan, time, date, buddies], (err, reult) => {
        console.log(err)
    })

});

// user routes

app.post('/register', (req, res) => {

    var post = function(hash) {
        const sqlInsert = "INSERT INTO users (email, password) VALUES (?, ?);";
        db.query(sqlInsert, [req.body.email, hash], (err, result) => {
                if (err) res.send({err: err});
                if (result) res.send(result);
        });
    }

    bcrypt.hash(req.body.password, 10).then((hash) => {
        post(hash)
    }) 



});

app.post('/login', (req, res) => {

    const email      = req.body.email
    const password   = req.body.password
    console.log(email)

    const sqlSelect = "SELECT * FROM users WHERE email = ?";

    db.query(sqlSelect, [email], (err, result) => {
        if (result.length === 0) { res.send({message: 'No username found'}); return; }
        bcrypt.compare(password, result[0].password).then((match) => {
            if (!match) {
                res.send({message: "Wrong password"})
            } else {
                res.json("logged in")
            }
        }).catch((err) => {
            console.log(err);
        })
        
    })

});

// listen

app.listen(3001, () => {
    console.log('running on 3001');
})