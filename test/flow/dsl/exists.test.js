'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - exists rule', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/existsRule.nools'));
    const Count = flow.getDefined('count');
    const called = new Count();

    it("should call when a string equals 'hello'", () => {
        return flow.getSession('hello', called).match().then(() => {
            assert.equal(called.called, 1);
        });
    });

    it("should not call when a string that does not equal 'hello'", () => {
        called.called = 0;
        return flow.getSession('world', called).match().then(() => {
            assert.equal(called.called, 0);
        });
    });

    it("should  call when a string that does not equal 'hello' and one that does exist", () => {
        called.called = 0;
        return flow.getSession('hello', 'world', called).match().then(() => {
            assert.equal(called.called, 1);
        });
    });
});
