'use strict';

const nools = require('../../lib');

describe('issue - 82', () => {
    it('should allow a trailing comment when using the dsl', () => {
        nools.compile(`rule 'hello' {
            when {
                s: String s == 'hello';
            }
            then{
                console.log(s);
            }
        } //test comment`, {name: 'issue82'});
    });
});
