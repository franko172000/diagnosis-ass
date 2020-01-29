const config = require('../config/config');
const Diagnosis = require('../models/Diagnosis');
const serverResponse = require('../helpers/ServerResponses');
const cache = config.redis;

/**
 * Diagnosis controller
 */
class DiagnosisController {
    static async getDiagnosis( req, res) {
        const page = req.query.page;
        const limit = req.query.limit;
        const category = req.query.category;
        let condition = {};
        const key = `diagnosis-get-${page}-${limit}-${category}`;
        if (category != null && category != undefined && category != ''){
            condition = {category};
        }

        cache.get(key, async (err, result)=>{
            if (result !== null) { // return data from cache
                return serverResponse.return200(res, 'success', JSON.parse(result));
            } else { // return data from db
                const records = await Diagnosis.getDiagnosticRecords(limit, condition, page);
                cache.setex(key, 3600, JSON.stringify(records));
                return serverResponse.return200(res, 'success', records);
            }
        })
    }

    static async getOneDiagnosis( req, res) {
        const code = req.query.code;
        const category = req.query.category;
        const key = `diagnosis-get-${code}-${category}`;
        const condition = {
            full_code: code,
        };
        if (category != null && category != undefined && category != '') {
            condition.category = category;
        }
        cache.get(key, async (err, result)=>{
            if (result !== null) { // return data from cache
                return serverResponse.return200(res, 'success', JSON.parse(result));
            } else { // return data from db
                const record = await Diagnosis.getOneDiagnosticRecords( condition);
                cache.setex(key, 3600, JSON.stringify(record));
                return serverResponse.return200(res, 'success', record || {});
            }
        });
    }

    static async removeDiagnosis( req, res) {
        const code = req.query.code;
        const condition = {
            full_code: code,
        };
        const record = await Diagnosis.deleteRecord( condition);
        if (record === 0) {
            return serverResponse.return404(res, 'Record does not exist');
        } else {
            return serverResponse.return200(res, 'Diagnosis record deleted successfully', null);
        }
    }

    static async addRecord(req, res) {
        const param = {...req.body};
        param.full_code = param.category + param.diagnosis_code;

        const record = await Diagnosis.getRecordCount( {full_code: param.full_code}, 'full_code');
        if (record.total > 0) {
            return serverResponse.return400(res, 'diagnosis code already exist');
        } else {
            await Diagnosis.addRecord(param);
            // clear cache
            cache.flushdb((err,result)=>{});
            return serverResponse.return200(res, 'diagnosis record saved', record);
        }
    }

    static async editRecord(req, res) {
        const param = {...req.body};
        const code = param.full_code;
        // create new code
        param.full_code = param.category + param.diagnosis_code;

        // check if new code already exist
        const record = await Diagnosis.getRecordCount( {full_code: param.full_code}, 'full_code');
        if (parseInt(record.total) === 1 && code !== param.full_code) {
            return serverResponse.return500(res, 'A diagnosis record already exist with new diagnosis code');
        } else {
            if (code === param.full_code) delete param.full_code; // check if new generated code is same as existing
            await Diagnosis.updateRecord({full_code: code}, param);
            return serverResponse.return200(res, 'diagnosis record updated', null);
        }
    }
}

module.exports = DiagnosisController;
