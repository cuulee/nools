'use strict';

const assert = require('assert');
const flow = require('../rules/orRule-compiled')();

const called = new (flow.getDefined('count'))();

describe('compiled - or rule', () => {
    it("should call when a string equals 'hello'", () => {
        return flow.getSession('world', called).match().then(() => {
            assert.equal(called.called, 1);
            assert.equal(called.s, 'world');
        });
    });
});
