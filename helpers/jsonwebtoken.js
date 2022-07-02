const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.APP_JWT_SECRET,  { expiresIn: 60 * process.env.APP_JWT_EXPIRED })
}


module.exports = generateToken
