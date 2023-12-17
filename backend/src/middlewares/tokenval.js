const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET

const tokenMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader && authHeader.split(' ')[1]

    // o token nao existe
    if (!token) return res.status(401).json({ errors: ['Need a token'] })

    try {

        const verified = jwt.verify(token, jwtSecret)

        req.user = await User.findById(verified.id).select('-password')

        next()

    } catch (error) {
        // token invalido?
        console.error('Token verification error:', error.message);
        res.status(401).json({ errors: ['Invalid Token'] })
    }
}

module.exports = tokenMiddleware;