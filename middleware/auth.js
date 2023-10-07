const jwt = require('jsonwebtoken');
require('dotenv').config();

const basicUserAuth = (req, res, next) =>{
    // Get "Bearer [Token] for header attribute (Authorization)"
    let token = req.headers['Authorization']
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err){
            console.error(err);
            console.log("[FAILED] - Invalid Token");
        }else{
            console.log("[AUTHORIZED] - Valid Token, Permission Granted")
            res.status(200).json(
                {
                    token:token.email
                }
            )
        }
    })
    next()
}

module.exports = {basicUserAuth}
