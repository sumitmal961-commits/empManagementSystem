
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const UserModel = require('../Models/users')


const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email })

        if (user) {
            return res.status(409).json({
                message: "user already exist , you can login again",
                success: false
            })
        }

    
        const hashPassword = await bcrypt.hash(password, 10)

        const userModel = new UserModel({ name, email,  password: hashPassword })
        await userModel.save()

        

         res.status(201).json({ 
            message: "Signup successful",
            success: true
        });


    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}



const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        const errMsg = "auth failed , email or password is incorrect."
        if (!user) {
            return res.status(409).json({
                message: errMsg,
                success: false
            })
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)

          if (!isPasswordEqual) {
            return res.status(409).json({
                message: errMsg,
                success: false
            })
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        
        res.status(201).json({
            message: "Login successfully.",
            success: true,
            jwtToken,
            email,
            name: user.name
        });


    } catch (err) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }

}



module.exports = { Signup, Login }
