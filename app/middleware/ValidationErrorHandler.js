const {validationResult} = require('express-validator');
const {return400, return500} = require('../helpers/ServerResponses')

/**
 * Class to handle validation error messages
 */
class ValidationErrorHandler {
    /**
     * Displays errors returned from the validation checker
     * @param {object} req request object
     * @param {object} res response object
     * @param {object} next pass request object to next method
     * @return {*}
     */
    static handleError(req, res, next) {
        try {
            const errorFormatter = ({location, msg, param, value, nestedErrors}) => {
                // Build your resulting errors however you want! String, object, whatever - it works!
                return `${msg}`;
            };
            const error = validationResult(req).formatWith(errorFormatter).array({onlyFirstError: true});
            if (error.length > 0) {
                return return400(res, error[0]);
            } else {
                next();
            }
        } catch (err) {
            return return500(res, err.toString());
        }
    };
}
module.exports = ValidationErrorHandler;
