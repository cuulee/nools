'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('custom contraint rule', () => {
    let called = 0;

    class HelloFact {
        constructor(value) {
            this.value = value || false;
        }
    }

    const customConstraintFlow = nools.flow('custom contraint', (flow) => {
        flow.rule('hello rule', [HelloFact, 'h', facts => !!facts.h.value], () => {
            called += 1;
        });
    });

    it('should call hello world rule', () => {
        const session = customConstraintFlow.getSession();
        session.assert(new HelloFact(false));
        session.assert(new HelloFact(true));
        return session.match().then(() => {
            assert.equal(called, 1);
        });
    });
});
