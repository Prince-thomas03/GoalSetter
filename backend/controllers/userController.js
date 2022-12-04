const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asynhandler = require('express-async-handler')
const User = require('../modals/userModals')
const { find } = require('../modals/userModals')

//@desc register user
//@route post/api/users
//@access public
const registerUser = asynhandler(async (req, res) => {

    //destructuring data from req.body
    const { name, email, password } = req.body


    //checking whether all the fields are their or not
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all fields')
    }


    //checking if user already exsist or not
    const userExsist = await User.findOne({ email })
    if (userExsist) {
        res.json(400)
        throw new Error('User already exsist')
    }


    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    //createUser
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    //if user is created  
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('please enter valid data')
    }


    // res.json({ message: 'register user' })
})


//@desc authenticate  user
//@route post/api/users/login
//@access public
const LoginUser = asynhandler(async (req, res) => {

    console.log("this is req body", req.body);

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        throw new Error('invalid creditionals')
    }

    res.json({ message: 'user logined' })
})




//@desc get user
//@route get/api/users/user
//@access public
const getUser = asynhandler(async (req, res) => {

    console.log( "this is req.user form geTuser",req.user);

    const { _id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })

})


//Token generation

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}




module.exports = {
    registerUser, LoginUser, getUser
}