const jwt = require('jsonwebtoken')
module.exports = function(req, res, next){
    if(req.nethod =="OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(401).json({message: "User isn't login"})

        }
        const decoded = 
        
    }catch(e){
        res.status(401).json({message: "User isn't login"})
    }
}