const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function getBids() {
  return request(app).get('/bid/get_bids');
}

// start the test for registration
describe('GET /get_bids', () => {
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
    return getBids().then((res) => {
      // console.log('>>> Bids', res.body);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail(' Phone exists or somehting happeneds');
      }
    });
  });
});
