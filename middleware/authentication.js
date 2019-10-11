const { verifyUser } = require('../helpers/jwt')

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers
        if (!authorization) return next({ status: 401, message: "Token has not been set" })
        let token = authorization.replace('Bearer ', '')
        req.decode = verifyUser(token)
        next()
    } catch (err) {
        next(err)
    }
}
