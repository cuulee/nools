'use strict';

const assert = require('assert');
const flow = require('../rules/existsRule-compiled')();

const called = new (flow.getDefined('count'))();

describe('compiled - exists rule', () => {
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
