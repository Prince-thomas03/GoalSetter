const jwt = require('jsonwebtoken')
const asynchandler = require('express-async-handler')
const User = require('../modals/userModals')

const protect = asynchandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get the toke
            // rememeber just dont forger to put space in split else res in out put
            token = req.headers.authorization.split(' ')[1]
            // token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            console.log("this is the decoded data",decoded);

            // get  user from token
            req.user = await User.findById(decoded.id).select('-password')

            console.log("this is req.user", req.user);

            next()

        } catch (error) {

            console.log(error);
            res.status(401)
            throw new Error("not authorized")

        }
    }

    if (!token) {
        res.status(401)
        throw new Error('not authorized , not toek')

    }


})

module.exports = { protect }