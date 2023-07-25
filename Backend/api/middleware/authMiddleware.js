const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    const JWT_SECRET = "sdfsdfhbjh";

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized");
        }
    }

    if(!token){
        res.status(401);
        throw new Error("No Token");
    }
});

module.exports = { protect };