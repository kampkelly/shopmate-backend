import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../index';

chai.use(chaiHttp);

describe('Departments', () => {
  it('Should get all departments', (done) => {
    chai.request(app)
      .get('/departments')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);
        expect(res.body[0].name).to.be.equal('Regional');
        done();
      });
  });
});
