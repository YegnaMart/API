const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function login() {
  return request(app).post('/user/login').send({
    phoneNo: '0911981162',
    password: '12345678',
  });
}

// start the test for registration
describe('POST /login', () => {
  // before doing testing we checking connection
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
    return login().then((res) => {
      //   console.log('>>> ', res.body);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail(' Phone exists or something happeneds');
      }
    });
  });
});
