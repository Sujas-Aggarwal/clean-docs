require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader)
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    // const token = authHeader.split(' ')[1];
    const token = req.cookies.jwt;
    // console.log("token",token)
    jwt.verify(
        token,
        process.env.REFRESHTOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({message:"Invalid Token"}); //invalid token
            req.username = decoded.username;
            req.roles = decoded.roles;
            req.uid = decoded.uid;
            // console.log("decoded",decoded)
            next();
        }
    );
}

module.exports = verifyJWT