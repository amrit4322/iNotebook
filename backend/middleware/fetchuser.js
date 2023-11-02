const jwt  = require("jsonwebtoken");
const JWT_SECRET  = "AmritsecretKey"

 

const fetchuser=(req,res,next)=>{
    let success = false;
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({success,error:"Please authenticate using a valid token 123"})
    }

    try {
        const data   = jwt.verify(token,JWT_SECRET);
        req.user  = data.user;
        next();
    } catch (err) {
        res.status(401).send({success,error:"Please authenticate using a valid token"})
    }
  
}

module.exports = fetchuser;