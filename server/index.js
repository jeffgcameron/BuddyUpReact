const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const badyParser = require("body-parser");
const bodyParser = require("body-parser");
const e = require("express");
const app = express();

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

    const email      = req.body.email
    const password   = req.body.password

    const sqlInsert = "INSERT INTO users (email, password) VALUES (?, ?);";
    db.query(sqlInsert, [email, password], (err, reult) => {
        console.log(err)
    })

});

app.post('/login', (req, res) => {

    const email      = req.body.email
    const password   = req.body.password

    const sqlSelect = "SELECT * FROM users WHERE username = ? AND password = ?";
    db.query(sqlSelect, [email, password], (err, result) => {
        if (err) {
            res.send({err: err});
        } 
        
        if (result) {
            res.send(result);
        } else {
            res.send({message: 'Wrong username/password'});
        }
        
    })

});

// listen

app.listen(3001, () => {
    console.log('running on 3001');
})