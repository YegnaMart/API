const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function register() {
  return request(app)
    .post('/user/register')
    .send({
      fullName: 'Yabu Yonas', // u are my son.
      phoneNo: '0911981162',
      email: 'tu_yihem_yichalal@gmail.com',
      password:"12345678",
      role: 'DeliveryAgent',
      location: [9.03314, 38.75008],
    });
}

// start the test for registration
describe('POST /register', () => {
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
    return register().then((res) => {
      console.log('>>> ', res.body);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail(' Phone exists or somehting happeneds');
      }
    });
  });
});
