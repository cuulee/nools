'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - comments', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/comments.nools'));

    it('should remove all block comments', () => {
        assert(!flow.containsRule('Goodbye2'));
        assert(flow.containsRule('Goodbye'));
        assert(flow.containsRule('Hello'));
    });
});
