const express = require('express')
const router = express.Router()
const { registerUser, LoginUser, getUser } = require('../controllers/userController')
const {protect} =require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', LoginUser)
router.get('/user',protect, getUser)

module.exports = router