'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 66', () => {
    const flow = nools.compile(
        `define Value {
                id : null,
                v : null,
                constructor : function (id, value) {
                    this.id = id;this.v = value;} 
                }
            rule 'issue66' {
                when {
                    v4 : Value v4.id =~ /xyz/ && v4.v == 27;
                }
                then {
                    emit('v4', v4);
                }
            }`, {name: 'issue66'});
    const Value = flow.getDefined('value');

    it('should properly evaluate a rule with a regular expressions and equality', () => {
        let called = 0;
        return flow.getSession(new Value('xyz', 27), new Value('xyz', 27))
            .on('v4', () => {
                called += 1;
            })
            .match().then(() => {
                assert.equal(called, 2);
            });
    });
});
