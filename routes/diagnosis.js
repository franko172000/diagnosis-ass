const express = require('express');
const router = express.Router();
const Diagnosis = require('../app/controllers/DiagnosisController');
const validation = require('../app/middleware/ValidationRules');
const validationError = require('../app/middleware/ValidationErrorHandler');

/* GET diagnosis record. */
router.get('/get', Diagnosis.getDiagnosis);
router.get('/get-one', [validation.diagnosis.getOne, validationError.handleError], Diagnosis.getOneDiagnosis);

// Add new record
router.post('/create', [validation.diagnosis.create, validationError.handleError], Diagnosis.addRecord);
router.post('/edit', [validation.diagnosis.update, validationError.handleError], Diagnosis.editRecord);

// delete record
router.delete('/delete', [validation.diagnosis.delete, validationError.handleError], Diagnosis.removeDiagnosis);

module.exports = router;
