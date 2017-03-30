'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 69', () => {
    it("should allow rule names with unescaped ' values", () => {
        assert(/'69\\'s issue'/.test(nools.transpile("rule \"69's issue\" {when {s : String s == 'hello';}then {emit('s', s);}}", {name: 'issue69'})));
    });
});
