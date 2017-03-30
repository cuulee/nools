'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 109', () => {

    const flow = nools.compile("rule 'issue109' {when {exists(s1 : String);}then {emit('exists');}}", {name: 'issue109'});

    it('should properly evaluate a rule with an exists constraint', () => {
        let called = 0;
        return flow.getSession('Hello')
            .on('exists', () => {
                called += 1;
            })
            .match().then(() => {
                assert.equal(called, 1);
            });
    });
});
