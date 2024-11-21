const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function postProduct() {
  return request(app)
    .post('/product/post_product')
    .send({
      productName: 'Barley',
      category: 'organic',
      quantity: 500,
      regionOfOrigin: 'bahir Dar',
      amount: 430,
      price: 3500,
      postedBy: '5fd605d4e0f0780db4870bc4',
      description:
        'sdfhgh egdskljhfdsgkljhdsf lkjs kjlhsdfkjghsd fkljghdsfgkljhds gkljdshf jjkhsdgkjl hjklgdshgkjldfgh',
    })
    .set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWZkOGU5ZTk1YzcxNzEyZjg4YTNkODY1Iiwicm9sZSI6IkZhcm1lciIsInBob25lTm8iOiIwOTM0NzEyODg5NCIsImlhdCI6MTYwODA1MTE5NiwiZXhwIjoxNjA4MTM3NTk2fQ.2PWmjQ3sggzYL6kFuK7oP-A7ePpTWcdVlcVm2AFEoag'
    );
}

// start the test for registration
describe('POST /postProduct', () => {
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

  it('OK, post new a Product', () => {
    return postProduct().then((res) => {
      // console.log('>>> ', res.body.success);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail('Unable to post new product');
      }
    });
  });
});
