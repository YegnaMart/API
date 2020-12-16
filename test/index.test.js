function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

// var common = require('./common');
// let register = require('./bid/getBids');

describe('index', function () {
  beforeEach(function () {
    console.log('running something before each test');
  });
  importTest('register', './user/register');
  importTest('login', './user/login');
  importTest('get_products', './product/getProduct');
  importTest('getBids', './bid/getBids');
  importTest('get_a_bid', './bid/getSingleBid');
  after(function () {
    console.log('after all tests');
  });
});
