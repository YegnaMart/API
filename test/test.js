let assert = require('assert');
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return 3 when the value is present', () => {
      assert.strictEqual([1, 2, 3,4,5].indexOf(4), 3);
    });
  });
});
