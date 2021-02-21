const test = require('japa');

const add = (a, b) => {
	return a + b;
};

test('addition works', (assert) => {
	assert.equal(add(2, 4), 6);
});
