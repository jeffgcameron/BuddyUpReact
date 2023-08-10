const {sign, verify}    = require("jsonwebtoken");
require('dotenv').config();

const createTokens = (user) => {
    console.log(user);
    const accessToken = sign({"id" : user.id}, process.env.SECRET)
    
    return accessToken
}

const validateToken = (req, res, next) => {
    
    const accessToken = req.body.token
    // if (!accessToken) { return res.status(400).json({ error: "not auth" }) }
    if (!accessToken) { console.log('no access token'); console.log(req.body); return }

    verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) { console.log({validationError: err}); return }
        req.isValid = true
        next()
    })

}

module.exports = { createTokens, validateToken }