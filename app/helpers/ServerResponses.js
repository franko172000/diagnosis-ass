/**
 * Class to return default server response
 */
// eslint-disable-next-line no-unused-vars,require-jsdoc
class ServerResponses {
    /**
     * Method to return server resource not found error
     * @param {object} res response object
     * @param {string} message response message
     * @return {object} json object
     */
    static return404(res, message) {
        return res.status(404).send({status: false, message});
    }

    /**
     * Method to return server's internal server error
     * @param {object} res response object
     * @param {string} message response message
     * @return {object} json object
     */
    static return500(res, message) {
        return res.status(500).send({status: false, message});
    }

    /**
     * Method to return server's bad request error
     * @param {object} res response object
     * @param {string} message response message
     * @return {object} json object
     */
    static return400(res, message) {
        return res.status(400).send({status: false, message});
    }

    /**
     * Method to return server's success response
     * @param {object} res response object
     * @param {string} message response message
     * @param {object} data response data
     * @return {object} json object
     */
    static return200(res, message, data) {
        return res.status(200).send({status: true, message, data});
    }
}

module.exports = ServerResponses;
