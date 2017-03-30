'use strict';

const assert = require('assert');
const flow = require('../rules/scope-compiled')();
const Message = flow.getDefined('message');

describe('compiled - scoped functions', () => {

    it('should call the scoped function', (next) => {
        const session = flow.getSession();
        const m = new Message('hello');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    });
});
