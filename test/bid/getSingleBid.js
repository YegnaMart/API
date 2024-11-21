const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function getABid() {
  return request(app).post('/bid/get_a_bid').send({
    bidNo: 'BID-5942',
  });
}

// start the test for registration
describe('POST /get_a_bid', () => {
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

  it('OK, get bid detail', () => {
    return getABid().then((res) => {
      //   console.log('>>> Bids', res.body);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail('Unable to get Bid Detail');
      }
    });
  });
});
