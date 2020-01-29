const jwt = require('jsonwebtoken');
const config = require('../config/config')
module.exports = {
    checkToken(req, res, next) {
        const token = req.headers['authorization'];
        console.log(token.split(' ')[1]);
        jwt.verify(token.split(' ')[1], config.secret, (err, decoded)=>{
            if (err) {
                return res.status(400).send({status: false, message: 'could not verify access token'});
            } else {
                req.body.user_id = decoded.user_id;
                next();
            }
        });
    },
}
