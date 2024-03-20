import JWT from "jsonwebtoken";
import User from "../models/usersModel.js";

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token)
        try {
            const decoded = await JWT.verify(token, process.env.JWTSECRET)

            console.log('decoded', decoded.id)
            const user = await User.findById(decoded.id).select("-password")
            console.log(user)
            req.user = user;
            next()
        } catch (err) {
            console.log(err.message)
            res.status(401).json({
                status: 'failed',
                error: 'Invalid token, Not authorized!'
            })
        }

    }

    if (!token) {
        res.status(401).json({
            status: 'failed',
            error: 'No token, Not authorized!'
        })
    } 
}

//uer role authorization
const authorizeUser = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Error(`Role ${req.user.role} is not authorized to visit this path`)
        }
        next()
    }
}

//Reset Password ,MiddleWare

const resetPasswordMiddleWare = async (req, res, next) => {
    let token = req.params.token
    console.log(token)
    if (token) {
        try {
            const decoded = await JWT.verify(token, process.env.JWTSECRET)

            console.log('decoded', decoded.email)
            const user = await User.fineOne({ email: decoded.email }).select("-password")
            console.log(user)
            req.user = user;
            next()

        } catch (err) {
            console.log(err.message)
            res.status(401).json({
                status: 'failed',
                error: 'Invalid token, Not authorized!'
            })
        }

    }

    if (!token) {
        res.status(401).json({
            status: 'failed',
            error: 'No token, Not authorized!'
        })
    }


}

export { protect, authorizeUser, resetPasswordMiddleWare }