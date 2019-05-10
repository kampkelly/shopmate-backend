import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../index';

chai.use(chaiHttp);

describe('Categories', () => {
  it('Should get all categories', (done) => {
    chai.request(app)
      .get('/categories')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.count).to.be.equal(4);
        expect(res.body.rows).to.be.an('array');
        done();
      });
  });

  it('Should get all categories with filters', (done) => {
    chai.request(app)
      .get('/categories?page=1&limit=2&order=category_id')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.count).to.be.equal(4);
        expect(res.body.rows).to.have.lengthOf(2);
        expect(res.body.rows).to.be.an('array');
        done();
      });
  });
});
