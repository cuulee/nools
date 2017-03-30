'use strict';

const assert = require('assert');
const flow = require('../rules/notRule-compiled')();

const called = new (flow.getDefined('count'))();

describe('compiled - not rule', () => {
    it("should call when a string that does not equal 'hello'", () => {
        return flow.getSession('world', called).match().then(() => {
            assert.equal(called.called, 1);
        });
    });

    it("should  not call when a string that does equal 'hello'", () => {
        called.called = 0;
        return flow.getSession('hello', called).match().then(() => {
            assert.equal(called.called, 0);
        });
    });

    it("should  not call when a string that does equal 'hello' and one that does not", () => {
        called.called = 0;
        return flow.getSession('hello', 'world', called).match().then(() => {
            assert.equal(called.called, 0);
        });
    });
});
