import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../index';

chai.use(chaiHttp);

describe('Products', () => {
  it('Should get all articles', (done) => {
    chai.request(app)
      .get('/products')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.count).to.be.equal(101);
        expect(res.body.rows).to.be.an('array');
        done();
      });
  });

  it('Should get a single article', (done) => {
    chai.request(app)
      .get('/products/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.an('string');
        done();
      });
  });

  it('Should give 404 if product does not exist', (done) => {
    chai.request(app)
      .get('/products/1000')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.include('Product cannot be found');
        done();
      });
  });

  it('Should get products in a category', (done) => {
    chai.request(app)
      .get('/products/inCategory/1')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.count).to.be.a('number');
        expect(res.body.rows).to.an('array');
        done();
      });
  });

  it('Should show 404 if no category', (done) => {
    chai.request(app)
      .get('/products/inCategory/1000')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.include('Category cannot be found');
        done();
      });
  });
});
