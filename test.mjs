import assert from 'node:assert/strict';
import { calculateAmount } from './script.js';

assert.equal(calculateAmount('0,25 dl', 3), '0,75 dl');
assert.equal(calculateAmount('2,5dl', 10), '25 dl');
assert.equal(calculateAmount('1dl', 7), '7 dl');
assert.equal(calculateAmount('0,5', 10), null);
assert.equal(calculateAmount('-', 4), null);
assert.equal(calculateAmount('', 4), null);

console.log('Kaikki laskentatestit läpäistiin.');
