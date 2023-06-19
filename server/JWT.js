const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({"id" : user.id}, "mybusecret")

    return accessToken
}

const validateToken = (req, res, next) => {
    
    const accessToken = req.body.token

    console.log(accessToken);

    // if (!accessToken) { return res.status(400).json({ error: "not auth" }) }
    if (!accessToken) { console.log('no access token'); return }

    verify(accessToken, 'mybusecret', (err, user) => {
        if (err) { console.log({validationError: err}); return }
        req.isValid = true
        next()
    })

}

module.exports = { createTokens, validateToken }