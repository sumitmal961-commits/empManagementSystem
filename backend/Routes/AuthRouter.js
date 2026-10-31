const { Signup, Login } = require('../Controllers/Authcontroller')
const { SignupValidation, LoginValidation } = require('../Middleware/AuthValidation')

const router = require('express').Router()

router.post('/signup', SignupValidation, Signup)
router.post('/login',LoginValidation,Login)


module.exports = router