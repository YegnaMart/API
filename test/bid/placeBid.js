const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function placeBid() {
  return request(app)
    .post('/bid/bid_product')
    .set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZkOGU5ZTk1YzcxNzEyZjg4YTNkODY1Iiwicm9sZSI6IkZhcm1lciIsInBob25lTm8iOiIwOTM0NzEyODg5NCIsImlhdCI6MTYwODA1MTE5NiwiZXhwIjoxNjA4MTM3NTk2fQ.2PWmjQ3sggzYL6kFuK7oP-A7ePpTWcdVlcVm2AFEoag'
    )
    .send({
      offer: 70000,
      id: '5fd8c9d5cf4a0f06ccf79ac1',
    });
}

// start the test for registration
describe('POST /bid_product', () => {
  //is this the test-suite ? Yeah for bid_product
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

  it('OK, bid For Product', () => {
    return placeBid()
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZkOGU5ZTk1YzcxNzEyZjg4YTNkODY1Iiwicm9sZSI6IkZhcm1lciIsInBob25lTm8iOiIwOTM0NzEyODg5NCIsImlhdCI6MTYwODA1MTE5NiwiZXhwIjoxNjA4MTM3NTk2fQ.2PWmjQ3sggzYL6kFuK7oP-A7ePpTWcdVlcVm2AFEoag'
      )
      .then((res) => {
        //   console.log('>>> Bids', res.body);
        if (res.body.success) {
          assert.ok('Valid');
        } else {
          assert.fail('Unable to get Bid Detail');
        }
      });
  });
});
