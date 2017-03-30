'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('flow#getFacts', () => {
    class HelloFact {
        constructor() {
            this.value = true;
        }
    }

    const flow = nools.flow('facts() flow', (builder) => {
        builder.rule('hello rule', [
            [HelloFact, 'h'],
            [String, 's'],
            [Number, 'n'],
            [Object, 'o'],
            [Boolean, 'b'],
        ], () => {
        });
    });

    it('should get all facts in the session', () => {
        const session = flow.getSession();
        const facts = [new HelloFact(), 'Hello', 1, {}, true];
        const l = facts.length;
        let i = 0;
        while (i < l) {
            session.assert(facts[i]);
            i += 1;
        }
        assert.deepEqual(session.getFacts(), facts);
    });

    it('should get all facts in the session by Type', () => {
        const session = flow.getSession();
        const facts = [new HelloFact(), 'Hello', 1, {}, true];
        const l = facts.length;
        let i = 0;
        while (i < l) {
            session.assert(facts[i]);
            i += 1;
        }
        assert.deepEqual(session.getFacts(HelloFact), [facts[0]]);
        assert.deepEqual(session.getFacts(String), [facts[1]]);
        assert.deepEqual(session.getFacts(Number), [facts[2]]);
        assert.deepEqual(session.getFacts(Object), [facts[0], facts[3]]);
        assert.deepEqual(session.getFacts(Boolean), [facts[4]]);
    });
});
