const Bcrypt = require("bcryptjs");

const hashingPassword =  function hashingPassword (req , res , next){
    if(req.body.password){
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
    }
    next()
}

module.exports = hashingPassword