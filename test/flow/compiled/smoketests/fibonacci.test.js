'use strict';

const assert = require('assert');
const flow = require('../../rules/fibonacci-compiled')();

const Fibonacci = flow.getDefined('fibonacci');
const Result = flow.getDefined('result');

describe('compiled - fibonacci smoke test', () => {
    it('should calculate fibonacci 3', () => {
        const result = new Result();
        return flow.getSession(new Fibonacci(3), result).match()
            .then(() => {
                assert.equal(result.value, 2);
            });
    });

    it('should calculate fibonacci 4', () => {
        const result = new Result();
        return flow.getSession(new Fibonacci(4), result).match().then(() => {
            assert.equal(result.value, 3);
        });
    });

    it('should calculate fibonacci 5', () => {
        const result = new Result();
        return flow.getSession(new Fibonacci(5), result).match()
            .then(() => {
                assert.equal(result.value, 5);
            });
    });

    it('should calculate fibonacci 6', () => {
        const result = new Result();
        return flow.getSession(new Fibonacci(6), result).match()
            .then(() => {
                assert.equal(result.value, 8);
            });
    });
});
