const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({"id" : user.id}, "mybusecret")

    return accessToken
}

const validateToken = (req, res, next) => {

    const accessToken = req.cookies['access-token']

    console.log(accessToken);

    if (!accessToken) { return res.status(400).json({ error: "not auth" }) }

    verify(accessToken, 'mybusecret', (err, user) => {
        if (err) console.log('verify err', err);
        req.user = user
        next()
    })

}

// const validateToken = (req, res, next) => {

//     const accessToken = req.cookies['access-token']

//     if (!accessToken) {
//         // res.redirect('/login')
//         return res.status(400).json({ error: "not auth" })
//     }

//     try {
//         const validToken = verify(accessToken, "mybusecret")
//         if (validToken) {
//             var id = validToken.id
//             req.authenticated = true
//             req.id = id
//             res.locals.userID = id 
//             return next()
//             // next()
//         }
//     } catch(err) {
//         return res.status(400).json({json: err});
//     }
// }

module.exports = { createTokens, validateToken }