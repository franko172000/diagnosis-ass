const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Diagnosis Test', ()=>{
    it('Test for diagnosis creation', (done)=>{
        chai
            .request(app)
            .post('/api/v1/diagnosis/create')
            .send({
                category: '001',
                diagnosis_code: '032',
                partial_description: 'Test description',
                full_description: 'Test description',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('diagnosis record saved');
                }
                done();
            });
    });

    it('Test when status code 400 is returned', (done)=>{
        chai
            .request(app)
            .post('/api/v1/diagnosis/create')
            .send({
                category: '',
                diagnosis_code: '',
                partial_description: '',
                full_description: '',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').to.be.oneOf([
                        'please supply category',
                        'please supply partial description',
                        'please supply full description',
                        'diagnosis code already exist',
                    ]);
                }
                done();
            });
    });

    it('Test for diagnosis edit', (done)=>{
        chai
            .request(app)
            .post('/api/v1/diagnosis/edit')
            .send({
                category: 'A010',
                diagnosis_code: '5',
                full_code: 'A0105',
                partial_description: 'Test description from test',
                full_description: 'Test description from test script',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('diagnosis record updated');
                }
                done();
            });
    });

    it('Test for diagnosis edit with bad request', (done)=>{
        chai
            .request(app)
            .post('/api/v1/diagnosis/edit')
            .send({
                category: '',
                diagnosis_code: '',
                full_code: '',
                partial_description: '',
                full_description: 'Test description',
            })
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').to.be.oneOf([
                        'please supply category',
                        'please supply partial description',
                        'please supply full description',
                        'please supply diagnosis code',
                    ]);
                }
                done();
            });
    });

    // it('Test for diagnosis edit when new code exist', (done)=>{
    //     chai
    //         .request(app)
    //         .post('/api/v1/diagnosis/edit')
    //         .send({
    //             category: 'A03',
    //             diagnosis_code: '0',
    //             full_code: 'A030',
    //             partial_description: 'Testing microphone1',
    //             full_description: 'Testing',
    //         })
    //         .end((err, res)=>{
    //             if (!err) {
    //                 res.status.should.to.be.oneOf([500]);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').equals(false);
    //                 res.body.should.have.property('message').equals('A diagnosis record already exist with new diagnosis code');
    //             }
    //             done();
    //         });
    // });

    it('Test to get diagnosis records', (done)=>{
        chai
            .request(app)
            .get('/api/v1/diagnosis/get')
            .query({limit: 20, page: 1, category: ''})
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

    it('Test to get one diagnosis record', (done)=>{
        chai
            .request(app)
            .get('/api/v1/diagnosis/get-one')
            .query({code: 'A040'})
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

    // it('Test to get one diagnosis record when not available', (done)=>{
    //     chai
    //         .request(app)
    //         .get('/api/v1/diagnosis/get-one')
    //         .query({code: '111'})
    //         .end((err, res)=>{
    //             if (!err) {
    //                 res.status.should.to.be.oneOf([404]);
    //                 res.body.should.be.a('object');
    //                 res.body.should.have.property('status').equals(false);
    //                 res.body.should.have.property('message').equals('Diagnosis record not available');
    //             }
    //             done();
    //         });
    // });

    it('Test to get one diagnosis record when code is not provided', (done)=>{
        chai
            .request(app)
            .get('/api/v1/diagnosis/get-one')
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply diagnosis code');
                }
                done();
            });
    });

    it('Test to get one diagnosis record when code is empty string', (done)=>{
        chai
            .request(app)
            .get('/api/v1/diagnosis/get-one')
            .query({code: ''})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply diagnosis code');
                }
                done();
            });
    });

    it('Test to delete diagnosis record', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/diagnosis/delete')
            .query({code: 'A0221'})
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([200]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(true);
                    res.body.should.have.property('message').equals('Diagnosis record deleted successfully');
                }
                done();
            });
    });

    it('Test to delete diagnosis record when code is not provided', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/diagnosis/delete')
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply diagnosis code');
                }
                done();
            });
    });

    it('Test to delete diagnosis record when code is empty string', (done)=>{
        chai
            .request(app)
            .delete('/api/v1/diagnosis/delete')
            .end((err, res)=>{
                if (!err) {
                    res.status.should.to.be.oneOf([400]);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').equals(false);
                    res.body.should.have.property('message').equals('Please supply diagnosis code');
                }
                done();
            });
    });
});
