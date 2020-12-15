function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

// var common = require('./common');
let register = require('./product/getProduct')

describe('index', function () {
  beforeEach(function () {
    console.log('running something before each test');
  });
  importTest('register', './user/register');
  importTest('login', './user/login');
  importTest('get_products', './product/getProduct');
  after(function () {
    console.log('after all tests');
  });
});
