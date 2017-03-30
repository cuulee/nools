'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - or rule', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/orRule.nools'));
    const Count = flow.getDefined('count');
    const called = new Count();

    it("should call when a string equals 'hello'", () => {
        return flow.getSession('world', called).match().then(() => {
            assert.equal(called.called, 1);
            assert.equal(called.s, 'world');
            called.called = 0;
            called.s = null;
            return flow.getSession('worldd', called).match().then(() => {
                assert.equal(called.called, 0);
                assert(called.s === null);
            });
        });
    });
});
