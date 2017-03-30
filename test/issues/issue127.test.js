'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 127', () => {
    let callbackCalled = false;
    const flow = nools.compile('', {name: 'issue127'}, () => {
        callbackCalled = true;
    });

    it('should callback should be called even if config provided', () => {
        assert(callbackCalled);
    });
});
