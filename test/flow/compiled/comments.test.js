'use strict';

const assert = require('assert');
const flow = require('../rules/comments-compiled')();

describe('compiled - comments', () => {
    it('should remove all block comments', () => {
        assert(!flow.containsRule('Goodbye2'));
        assert(flow.containsRule('Goodbye'));
        assert(flow.containsRule('Hello'));
    });
});
