const express = require('express');
const router = express.Router();
const validation = require('../app/middleware/ValidationRules');
const validationError = require('../app/middleware/ValidationErrorHandler');
const Users = require('../app/controllers/Users');

/* GET access token. */
router.get('/', [validation.auth.token, validationError.handleError], Users.getToken);

module.exports = router;
