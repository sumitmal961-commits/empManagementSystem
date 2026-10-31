
const joi = require('joi')

const SignupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).max(50).required()
    })

    const { errors } = schema.validate(req.body)
    if (errors) {
        return res.status(400).json({
            message: "Validation Error", errors
        })
    }

    next()

}

const LoginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(50).required()
    })

    const { errors } = schema.validate(req.body)
    if (errors) {
        return res.status(400).json({
            message: "Validation Error", errors
        })
    }

    next()

}

module.exports = { SignupValidation, LoginValidation }



