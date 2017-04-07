'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 65', () => {
    class Thing {
        constructor(step) {
            this.step = step;
            this.world = 'world';
        }

        hello() {
            return 'hello';
        }
    }

    const flow = nools.flow('issue65', (builder) => {
        builder.rule('issue65',
            [Thing, '$t', '($t.step && isUndefined($t[$t.step]))'],
            (facts, session) => {
                session.emit('thing', facts.$t);
            });
    });

    it('should allow property lookup using [] instead of . notation', () => {
        const calledWith = [];
        return flow.getSession(new Thing('hello'), new Thing('world'), new Thing('other'), new Thing('other2'))
            .on('thing', (t) => {
                calledWith.push(t);
            })
            .match().then(() => {
                assert(calledWith.length === 2);
                assert.equal(calledWith[0].step, 'other2');
                assert.equal(calledWith[1].step, 'other');
            });
    });
});
