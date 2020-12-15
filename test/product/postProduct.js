const request = require('supertest');
const dotenv = require('dotenv');

const userRouter = require('../../routes/user.router');
const connectDB = require('../../config/db');
const { assert, expect } = require('chai');
const { app } = require('../../index');

dotenv.config({ path: './config/.env' });

function postProduct() {
  return request(app).post('/product/post_product').send({
    productName: 'Barley',
    category: 'organic',
    quantity: 500,
    regionOfOrigin: 'bahir Dar',
    price: 3500,
    description:
      'sdfhgh egdskljhfdsgkljhdsf lkjs kjlhsdfkjghsd fkljghdsfgkljhds gkljdshf jjkhsdgkjl hjklgdshgkjldfgh',
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
    return postProduct().then((res) => {
      //   console.log('>>> ', res.body);
      if (res.body.success) {
        assert.ok('Valid');
      } else {
        assert.fail(' Phone exists or somehting happeneds');
      }
    });
  });
});
