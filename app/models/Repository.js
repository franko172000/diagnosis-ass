const config = require('../config/config');
const knex = require('knex')(config.dbConnection);

/**
 * Class to perform basic db functions
 */
class Repository {
    constructor(table) {
        this.tableName = table;
    }

    knexLib() {
        return knex(this.tableName);
    }
    /**
     * Function to return diagnosis records
     * @param {Number} limit set number of records to show
     * @param {object} condition set thee query condition
     * @param {Number} page set page number
     * @return {Promise<*|Knex.QueryBuilder<TRecord, TResult>>}
     */
    async getRecords(limit, condition, page){

        const obj = this.knexLib();
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

    /**
     * Method to get one record from db
     * @param ${string} condition to fetch data from database
     * @returns {Promise}
     */
    async getOneRecord(condition) {
        return this.knexLib()
            .where(condition)
            .first();
    }

    /**
     *  Method to delete data from db
     * @param ${string} condition to fetch data from database
     * @returns {Promise}
     */
    async deleteRecord(condition) {
        return this.knexLib()
            .where(condition)
            .delete();
    }

    /**
     *  Method to update record
     * @param condition
     * @param data
     * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
     */
    async updateRecord(condition, data) {
        return this.knexLib()
            .where(condition)
            .update(data);
    }

    /**
     * Method to add record to db
     * @param {object} params
     * @returns {Promise<Knex.QueryBuilder<TRecord, DeferredKeySelection<TRecord, never>[]> | Knex.QueryBuilder<TRecord, DeferredIndex.Augment<UnwrapArrayMember<TResult>, TRecord, TKey>[]> | Knex.QueryBuilder<TRecord, DeferredKeySelection.Augment<UnwrapArrayMember<TResult>, TRecord, TKey>[]> | Knex.QueryBuilder<TRecord, number[]> | (function()) | (function(): void)>}
     */
    async addRecord(params) {
        return this.knexLib()
            .insert(params);
    }

    /**
     * Function to count of records
     * @param {object} condition set thee query condition
     * @param {string} columnName set table column name
     * @return {Promise<*>}
     */
    async getRecordCount(condition, columnName) {
        const obj = this.knexLib();
        if (condition != null && condition.constructor === Object) {
            obj.where(condition);
        }
        return obj.count({total: columnName}).first();
    }
}

module.exports = Repository;
