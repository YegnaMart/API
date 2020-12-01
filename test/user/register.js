const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');

dotenv.config({ path: './config/.env' });

// start the test for registration
describe('POST /register', () => {
  before((done) => {
    connectDB()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('OK, User Creates new account', () => {
    request(userRouter)
      .post('/register')
      .send({
        fullName: 'Malik Yonas',
        phoneNo: '0911781162',
        email: 'malik@gmail.com',
        password: '12345678',
        role: 'DeliveryAgent',
        location: [9.03314, 38.75008],
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        assert(res.body.success, true);
      });
  });
});
