'use strict';

const nools = require('../../');
const assert = require('assert');

describe('#matchHalt', () => {
    class Count {
        constructor(count) {
            this.count = count;
        }
    }

    const haltFlow = nools.flow('Match with halt Flow', (builder) => {
        builder.rule('Stop', [Count, 'c', 'c.count == 6'], (facts, engine) => {
            engine.halt();
        });

        builder.rule('Inc', [Count, 'c'], (facts, engine) => {
            facts.c.count += 1;
            engine.modify(facts.c);
        });
    });

    it('should stop match with halt', () => {
        const session = haltFlow.getSession(new Count(0));
        return session.match().then((err) => {
            assert(!err);
            assert.equal(session.getFacts(Count)[0].count, 6);
        });
    });
});
