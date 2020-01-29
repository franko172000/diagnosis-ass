const express = require('express');
const router = express.Router();
const {validation, validationError, validateToken} = require('../app/middleware');
const Category = require('../app/controllers/CategoryController');

/* GET users listing. */
router.post('/create', [validation.category.required, validationError.handleError], Category.addRecord);
router.post('/edit', [validation.category.required, validationError.handleError], Category.editRecord);
router.get('/get', Category.getCategories);
router.get('/get-one', [validation.category.requiredOne, validationError.handleError], Category.getOneCategory);
router.delete('/delete', [validation.category.requiredOne, validationError.handleError], Category.removeCategory);

module.exports = router;
