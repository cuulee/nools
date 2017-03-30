'use strict';

const assert = require('assert');
const nools = require('../../../../lib');
const resolve = require('path').resolve;

describe('dsl - fibonacci nools smoketest', () => {
    const flow = nools.compile(resolve(__dirname, '../../rules/fibonacci.nools'));
    const Fibonacci = flow.getDefined('fibonacci');
    const Result = flow.getDefined('result');

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
