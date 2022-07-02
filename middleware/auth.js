const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).json({
        code: 401,
        message: 'Invalid Token!'
    })
  
    jwt.verify(token, process.env.APP_JWT_SECRET, (err, user) => {

        if(err) return res.status(403).json({
            code: 403,
            message: 'Token Error'
        })

        req.user = user
        next()
    })
  }


module.exports = {
    authentication
}
