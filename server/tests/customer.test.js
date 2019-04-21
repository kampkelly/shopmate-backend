import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'babel-polyfill';
import faker from 'faker';
import app from '../index';

chai.use(chaiHttp);

const customer = {
  email: faker.internet.email().toLowerCase(),
  name: 'testuser',
  password: 'Password1!'
};

const existingCustomer = {
  email: 'mack41@hotmail.com',
  name: 'testuser',
  password: 'Password1!'
};

const invalidCustomer = {
  email: 'mack41@hotmail.com',
  userName: 'testuser',
  password: 'Pass'
};


describe('Customers', () => {
  it('Should register customer', (done) => {
    chai.request(app)
      .post('/customers')
      .send(customer)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.accessToken).to.be.a('string');
        expect(res.body.customer).to.be.an('object');
        expect(res.body.customer.name).to.equal('testuser');
        done();
      });
  });

  it('Should not register customer if email exists', (done) => {
    chai.request(app)
      .post('/customers')
      .send(existingCustomer)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body.message.errors).to.be.an('array');
        expect(res.body.message.errors[0].message).to.include('email must be unique');
        done();
      });
  });

  it('Should not register customer on bad requests', (done) => {
    chai.request(app)
      .post('/customers')
      .send(invalidCustomer)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.be.an('array');
        expect(res.body.message[0]).to.include('Name is required');
        expect(res.body.message[2]).to.include('Password must be at least 6 characters');
        done();
      });
  });
});
