const config = require('../config/config')
const jwt = require('jsonwebtoken');
/**
 * Users controller
 */
class Users {
    /**
     * Function to handle authentication
     * @param {object} req
     * @param {object} res
     * @return {object}
     */
    static getToken(req, res) {
        const email = req.body.email;
        //  Generate JWT access token
        const token = jwt.sign({email}, config.appSecret);
        //  Send response
        return res.status(200).json({status: true, message: 'success', token});
    }
}

module.exports = Users;
