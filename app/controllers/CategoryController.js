const config = require('../config/config');
const Category = require('../models/Category');
const Diagnosis = require('../models/Diagnosis');
const serverResponse = require('../helpers/ServerResponses');
const cache = config.redis;
/**
 * Diagnosis controller
 */
class CategoryController {
    static async getCategories(req, res) {
        const page = req.query.page;
        const limit = req.query.limit;
        const key = `category-get-${page}-${limit}`;
        cache.get(key, async (err, result)=>{
                if (result != null) { // return data from cache
                    return serverResponse.return200(res, 'success', JSON.parse(result));
                } else { // return data from db
                    const records = await Category.getRecords(limit, null, page);
                    cache.setex(key, 3600, JSON.stringify(records))
                    return serverResponse.return200(res, 'success', records);
                }
        });
    }

    static async getOneCategory(req, res) {
        const code = req.query.code;
        const key = `category-get-one-${code}`;
        cache.get(key, async (err, result)=>{
            if (result !== null) { // return data from cache
                return serverResponse.return200(res, 'success', JSON.parse(result));
            } else { // return data from db
                const record = await Category.getOneRecord({code});
                //cache.setex(key, 3600, JSON.stringify(record));
                return serverResponse.return200(res, 'success', record || {});
            }
        });
    }

    static async removeCategory(req, res) {
        const code = req.query.code;
        const diagnosisRec = await Diagnosis.getRecordCount({category: code}, 'category');
        if (diagnosisRec.total > 0) {
            return serverResponse.return500(res, 'Category cannot be deleted because there are diagnosis records associated to it');
        } else {
            const record = await Category.deleteRecord( {code});
            if (record === 0) {
                return serverResponse.return500(res, 'category delete failed');
            } else {
                return serverResponse.return200(res, 'category deleted successfully', null);
            }
        }
    }

    static async addRecord(req, res) {
        const param = {...req.body};
        const record = await Category.getRecordCount( {code: param.code}, 'code');
        if (record.total > 0) {
            return serverResponse.return400(res, 'category code already exist');
        } else {
            await Category.addRecord(param);
            return serverResponse.return200(res, 'category created successfully', record);
        }
    }

    static async editRecord(req, res) {
        const param = {...req.body};
        await Category.updateRecord({code: param.code}, {code: param.name});
        return serverResponse.return200(res, 'category record updated', null);
    }
}

module.exports = CategoryController;
