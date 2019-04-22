import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import app from '../index';

chai.use(chaiHttp);

describe('Shopping Cart', () => {
  it('Should generate a unique id', (done) => {
    chai.request(app)
      .get('/shoppingcart/generateUniqueId')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body.cart_id).to.be.a('string');
        expect(res.body.cart_id).to.have.lengthOf(18);
        done();
      });
  });
});
