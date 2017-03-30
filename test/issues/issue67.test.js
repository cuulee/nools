'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 67', () => {
    const flow = nools.compile(
        'define Value {id : null,v : null,constructor : function (id, value) {this.id = id;this.v = value;} }' +
        "rule 'issue67' {when {v4 : Value v4.id =~ /xyz/ && v4.v =~ /abc/;}then {emit('v4', v4);}}", {name: 'issue67'});
    const Value = flow.getDefined('value');

    it('should properly evaluate a rule with multiple regular expressions', () => {
        let called = 0;
        return flow.getSession(new Value('xyz', 'abc'), new Value('xyz', 'abc'))
            .on('v4', () => {
                called++;
            })
            .match().then(() => {
                assert.equal(called, 2);
            });
    });
});
