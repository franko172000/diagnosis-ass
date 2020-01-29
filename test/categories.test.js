const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Category Test', ()=>{
    it('Test for category creation', (done)=>{
        chai
            .request(app)
            .post('/api/v1/category/create')
            .send({
                code: '001',
                name: 'This is a category',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('category created successfully');
                }
                done();
            });
    });

    it('Test when status code 400 is returned', (done)=>{
        chai
            .request(app)
            .post('/api/v1/category/create')
            .send({
                code: '',
                name: '',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').to.be.oneOf([
                        'Please supply category code',
                        'Please supply category name',
                    ]);
                }
                done();
            });
    });

    it('Test for category edit', (done)=>{
        chai
            .request(app)
            .post('/api/v1/category/edit')
            .send({
                code: '001',
                name: 'This is a category2',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('category record updated');
                }
                done();
            });
    });

    it('Test for category edit with bad request', (done)=>{
        chai
            .request(app)
            .post('/api/v1/category/edit')
            .send({
                code: '',
                name: '',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').to.be.oneOf([
                        'Please supply category code',
                        'Please supply category name',
                    ]);
                }
                done();
            });
    });

    it('Test to get category records', (done)=>{
        chai
            .request(app)
            .get('/api/v1/category/get')
            .query({limit: 20, page: 1})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('success');
                    res.body.should.have.property('data').be.a('array');
                }
                done();
            });
    });

    it('Test to get one category record', (done)=>{
        chai
            .request(app)
            .get('/api/v1/category/get-one')
            .query({code: '001'})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('success');
                    res.body.should.have.property('data').be.a('object');
                }
                done();
            });
    });

    it('Test to get one category record when code is not provided', (done)=>{
        chai
            .request(app)
            .get('/api/v1/category/get-one')
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply category code');
                }
                done();
            });
    });

    it('Test to delete category when it fails', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/category/delete')
            .query({code: '002'})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([500]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('category delete failed');
                }
                done();
            });
    });

    it('Test to delete category', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/category/delete')
            .query({code: 'B080'})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('category deleted successfully');
                }
                done();
            });
    });

    it('Test to delete category when code is not provided', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/category/delete')
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply category code');
                }
                done();
            });
    });

    it('Test to prevent delete of category that has diagnosis record associated to it', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/category/delete')
            .query({code: 'A06'})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([500]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Category cannot be deleted because there are diagnosis records associated to it');
                }
                done();
            });
    });
});
