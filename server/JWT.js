const {sign, verify} = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign({"id" : user.id}, "mybusecret")

    return accessToken
}

const validateToken = (req, res, next) => {

    const accessToken = req.cookies['access-token']

    if (!accessToken) {
        // res.redirect('/login')
        return res.status(400).json({ error: "not auth" })
    }

    try {
        const validToken = verify(accessToken, "mybusecret")
        if (validToken) {
            var id = validToken.id
            req.authenticated = true
            req.id = id
            console.log('id', id);
            return next()
        }
    } catch(err) {
        return res.status(400).json({json: err});
    }
}

module.exports = { createTokens, validateToken }