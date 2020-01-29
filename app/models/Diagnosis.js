const Repository = require('./Repository');

/**
 * Diagnosis model
 */
class Diagnosis extends Repository {
    constructor() {
        super('diagnosis');
    }

    async getDiagnosticRecords(limit, condition, page){
        const obj = this.knexLib()
            .leftJoin('category','category','code')
            .select('full_code','name AS category','diagnosis_code','full_description','partial_description');
        let queryPage = 0;
        let queryLimit = 20;
        let offset = 0;
        if (condition != null && condition.constructor === Object) {
            obj.where(condition);
        }
        if (limit != null && limit > 0) {
            queryLimit = limit;
        }
        if (page != null && page > 0) {
            queryPage = page;
            offset = (queryPage - 1) * queryLimit;
        }
        return obj
            .offset(offset)
            .limit(queryLimit);

    }
    async getOneDiagnosticRecords(condition){
        return this.knexLib()
            .leftJoin('category','category','code')
            .select('full_code','name AS category','diagnosis_code','full_description','partial_description')
            .where(condition)
            .first()
    }
}

module.exports = new Diagnosis();
