let assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return 3 when the value is present', () => {
      assert.strictEqual([1, 2, 3, 4, 5].indexOf(4), 3);
    });
  });
});

// make another test
describe('User', () => {
  describe('#save()', () => {
    it('should save with out error', (done) => {
      let user = new User('Luna');
      user.save((err) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});
