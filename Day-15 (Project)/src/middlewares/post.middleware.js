const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {

    
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "token not provide, unsuthorized can be try access",
    });
    }
    
     let decode;

     try {
       decode = jwt.verify(token, process.env.JWT_SECRET);
     } catch (error) {
       return res.status(401).json({
         message: "user not login",
       });
    }
    
    req.user = decode;
    next()
}

module.exports=identifyUser