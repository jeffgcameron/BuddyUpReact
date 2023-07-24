const express                           = require("express")
const cors                              = require("cors")
const cookieParser                      = require('cookie-parser');
const { createTokens, validateToken }   = require('./JWT.js');
require('dotenv').config();

const mysql                             = require("mysql")
const bodyParser                        = require("body-parser");
const app                               = express();
const bcrypt                            = require('bcrypt');

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}))


const db = mysql.createConnection({
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

app.post('/api/get-activity', (req, res) => {
    const sqlSelect = "Select * FROM activities WHERE id =?";
    db.query(sqlSelect, [req.body.id], (err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete-activity', (req, res) => {
    const sqlSelect = "DELETE FROM activities WHERE id =?";
    db.query(sqlSelect, [req.body.id], (err, result) => {
        console.log(err);
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

    const sqlInsert = "INSERT INTO activities (id, name, location, plan, time, date, buddies, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert, [id, name, location, plan, time, date, buddies, userID], (err, reult) => {
        console.log(err)
    })

});

//get all profiles 

app.get('/api/get-profiles', (req, res) => {
    const sqlSelect = "Select * FROM profiles";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

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

// edit profile

app.put('/edit-profile', (req, res) => {

    const id                = req.body.id
    const imgURL            = req.body.imgURL
    const firstName         = req.body.firstName
    const lastName          = req.body.lastName
    const location          = req.body.location
    const bio               = req.body.bio
    const activities        = req.body.activities
    const certifications    = req.body.certifications
    const sqlInsert = "UPDATE profiles SET firstName = ?, lastName = ?, imgURL = ?, location = ?, bio = ?, activities = ?, certifications = ? WHERE id = ?";
    
    db.query(sqlInsert, [firstName, lastName, imgURL, location, bio, activities, certifications, id], (err, reult) => {
        console.log(err)
    })

});

// edit post 


app.put('/edit-post', (req, res) => {
    console.log(req.body);

    const id                = req.body.id
    const name              = req.body.name
    const location          = req.body.location
    const plan              = req.body.plan
    const time              = req.body.time
    const date              = req.body.date
    const buddies           = req.body.buddies


    const sqlInsert = "UPDATE activities SET name = ?, plan = ?, time = ?, location = ?, date = ?, buddies = ? WHERE id = ?";
    db.query(sqlInsert, [name, plan, time, location, date, buddies, id], (err, reult) => {
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

// individual activity



// myActivities

app.post("/api/my-activities", (req, res) => {
    const sqlSelect = "SELECT * FROM activities WHERE userID = ?";
    db.query(sqlSelect, [req.body.userID], (err, result) => {
        res.send(result)
    })
})

// comments

app.post('/save-comment', (req, res) => {
    const id                = req.body.id
    const userID            = req.body.userID
    const activityID        = req.body.activityID
    const comment           = req.body.comment
    const name              = req.body.name
    const imgURL            = req.body.imgURL
    const time              = req.body.time

    const sqlInsert = "INSERT INTO comments (id, userID, activityID, comment, name, imgURL, time) VALUES (?, ?, ?, ?, ?, ?, ?);";
    db.query(sqlInsert, [id, userID, activityID, comment, name, imgURL, time], (err, result) => {
        console.log(err)
    })

});


app.get('/api/get-comments', (req, res) => {
    const sqlSelect = "Select * FROM comments";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})

// saves

app.post('/save-activity', (req, res) => {
    const id                = req.body.id
    const userID            = req.body.userID
    const activityID        = req.body.activityID

    const sqlInsert = "INSERT INTO saves (id, userID, activityID) VALUES (?, ?, ?);";
    db.query(sqlInsert, [id, userID, activityID], (err, result) => {
        console.log(err)
    })

});

app.post("/api/my-saves", (req, res) => {
    const sqlSelect = "SELECT * FROM saves WHERE userID = ?";
    db.query(sqlSelect, [req.body.userID], (err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete-save', (req, res) => {
    console.log(req.body.id);
    const sqlSelect = "DELETE FROM saves WHERE id = ?";
    db.query(sqlSelect, [req.body.id], (err, result) => {
        console.log(err);
    })
})

// signups

app.get('/api/get-signups', (req, res) => {
    const sqlSelect = "Select * FROM signups";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})


app.post('/signup-activity', (req, res) => {
    const id                = req.body.id
    const userID            = req.body.userID
    const activityID        = req.body.activityID
    const name              = req.body.name
    const imgURL            = req.body.imgURL

    const sqlInsert = "INSERT INTO signups (id, userID, activityID, name, imgURL) VALUES (?, ?, ?, ?, ?);";
    db.query(sqlInsert, [id, userID, activityID, name, imgURL], (err, result) => {
        console.log(err)
    })

});

app.post("/api/my-signups", (req, res) => {
    const sqlSelect = "SELECT * FROM signups WHERE userID = ?";
    db.query(sqlSelect, [req.body.userID], (err, result) => {
        res.send(result)
    })
})

app.delete('/api/delete-signup', (req, res) => {
    console.log(req.body.id);
    const sqlSelect = "DELETE FROM signups WHERE id = ?";
    db.query(sqlSelect, [req.body.id], (err, result) => {
        console.log(err);
    })
})

//auth

app.get("/auth", validateToken, (req, res) => {
    res.send(req.isValid)
})

app.post("/auth", validateToken, (req, res) => {
    res.send(req.isValid)
})

// listen

app.listen(process.env.PORT, () => {
    console.log('running on ' + process.env.PORT);
})