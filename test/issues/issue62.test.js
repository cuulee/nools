'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 62', () => {
    it('should allow rule names with " character in constraints', () => {
        assert(/"s == \\"hello\\""/.test(nools.transpile('rule "issue62" {when {s : String s == "hello";}then {emit("s", s);}}', {name: 'issue62'})));
    });
});

