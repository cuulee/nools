'use strict';

const nools = require('../../lib');

describe('issue - 127', () => {
    it('should callback should be called even if config provided', (next) => {
        nools.compile('', {name: 'issue127'}, () => next());
    }).timeout(1000);
});
