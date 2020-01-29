const Repository = require('./Repository');
// initialize db query builder

/**
 * Category model
 */
class Category extends Repository {
    constructor() {
        super('category');
    }
}

module.exports = new Category();
