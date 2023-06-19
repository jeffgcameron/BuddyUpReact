const express                   = require("express")
const cors                      = require("cors")

<<<<<<< HEAD
const mysql                             = require("mysql")
const bodyParser                        = require("body-parser");
const app                               = express();
const bcrypt                            = require('bcrypt');
// const path                              = require('path');
=======
const session                   = require('express-session');
const mysql                     = require("mysql")
const bodyParser                = require("body-parser");
const app                       = express();
const bcrypt                    = require('bcrypt');
const cookieParser              = require('cookie-parser');

const { createTokens, validateToken }                        = require('./JWT.js');
>>>>>>> parent of 7ab2b7b (preparing for production)

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))

const db = mysql.createPool({
    user:           "root",
    host:           "localhost",
    password:       "root",
    database:       "BUdb"
});

// all routes

// app.get("/*", function(req, res) {
//     res.sendFile(
//         path.join(__dirname, "../client/build/index.html"),
//         function(err) {
//             if (err) {
//                 res.status(500).send(err)
//             }
//         }
//     )
// })

// activities routes

app.get('/api/get-activites', (req, res) => {
    const sqlSelect = "Select * FROM activities";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

app.post('/api/activites', (req, res) => {

    const id                = req.body.id
    const name              = req.body.name
    const location          = req.body.location
    const plan              = req.body.plan
    const time              = req.body.time
    const date              = req.body.date
    const buddies           = req.body.buddies
    const userID            = req.body.userID
    const userName          = req.body.userName
    const imgURL          = req.body.imgURL

    const sqlInsert = "INSERT INTO activities (id, name, location, plan, time, date, buddies, userID, userName, imgURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert, [id, name, location, plan, time, date, buddies, userID, userName, imgURL], (err, reult) => {
        console.log(err)
    })

});

// user routes

app.post('/register', (req, res) => {

    var post = function(hash) {
        const sqlInsert = "INSERT INTO users (id, email, password) VALUES (?, ?, ?);";
        console.log(req.body)
        console.log(hash)
        db.query(sqlInsert, [req.body.id, req.body.email, hash], (err, result) => {
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
    const sqlSelect = "SELECT * FROM users WHERE email = ?";

    db.query(sqlSelect, [email], (err, result) => {
        if (result.length === 0) { res.send({message: 'No username found'}); return; }
        bcrypt.compare(password, result[0].password).then((match) => {
            if (!match) {
                res.send({message: "Wrong password"})
            } else {

                const accessToken = createTokens(result[0]);
                
                res.cookie('access-token', accessToken)
                res.cookie('id', result[0].id)

                res.json(result[0])
            }
        }).catch((err) => {
            console.log(err);
        })
        
    })

});

// createProfile

    app.post('/build-profile', (req, res) => {

        console.log(req.body);
        const id                = req.body.id
        const imgURL            = req.body.imgURL
        const firstName         = req.body.firstName
        const lastName          = req.body.lastName
        const location          = req.body.location
        const bio               = req.body.bio
        const activities        = req.body.activities
        const certifications    = req.body.certifications
        const userID            = req.body.userID

        const sqlInsert = "INSERT INTO profiles (id, imgURL, firstName, lastName, location, bio, activities, certifications, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        db.query(sqlInsert, [id, imgURL, firstName, lastName, location, bio, activities, certifications, userID], (err, reult) => {
            console.log(err)
        })

    });

// my profile

app.post("/my-profile", (req, res) => {
    const sqlSelect = "SELECT * FROM profiles WHERE userID = ?";
    db.query(sqlSelect, [req.body.userID], (err, result) => {
        res.send(result)
    })
})

// myActivities

app.post("/api/my-activities", (req, res) => {
    const sqlSelect = "SELECT * FROM activities WHERE userID = ?";
    db.query(sqlSelect, [req.body.userID], (err, result) => {
        res.send(result)
    })
})


app.get("/auth", validateToken, (req, res) => {
    res.send(req.isValid)
})

app.post("/auth", validateToken, (req, res) => {
    res.send(req.isValid)
})

// listen

<<<<<<< HEAD
var PORT = process.env.PORT || "3001"

app.listen(PORT, () => {
    console.log('running on ' + PORT);
=======
app.listen(3001, () => {
    console.log('running on 3001');
>>>>>>> parent of 7ab2b7b (preparing for production)
})