import assert from 'node:assert/strict';

const selects = Array.from({ length: 3 }, () => ({
  options: [],
  add(option) { this.options.push(option); },
  addEventListener() {},
}));

globalThis.Option = class Option {
  constructor(text, value, defaultSelected, selected) {
    Object.assign(this, { text, value, defaultSelected, selected });
  }
};
globalThis.document = {
  querySelectorAll(selector) {
    return selector === '.mop-count' ? selects : [];
  },
};

const { calculateAmount, formatOptionLabel } = await import('./script.js');

assert.equal(calculateAmount('0,25 dl', 3), '0,75 dl');
assert.equal(calculateAmount('2,5dl', 10), '25 dl');
assert.equal(calculateAmount('1dl', 7), '7 dl');
assert.equal(calculateAmount('0,5', 10), null);
assert.equal(calculateAmount('-', 4), null);
assert.equal(calculateAmount('', 4), null);
assert.equal(formatOptionLabel(1), '1 kpl');
assert.equal(formatOptionLabel(10), '10 kpl');
selects.forEach((select) => {
  assert.equal(select.options.length, 10);
  assert.deepEqual(select.options.map(({ text }) => text), [
    '1 kpl', '2 kpl', '3 kpl', '4 kpl', '5 kpl',
    '6 kpl', '7 kpl', '8 kpl', '9 kpl', '10 kpl',
  ]);
});

console.log('Kaikki laskentatestit läpäistiin.');
