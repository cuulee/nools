'use strict';

const assert = require('assert');
const nools = require('../../');

describe('flow#rule', () => {
    let called = 0;
    const flow = nools.flow('test rule flow');
    it('should create a rule', () => {
        flow.rule('test rule', [String, 's', "s == 'hello'"], () => {
            called += 1;
        });
        assert(flow.containsRule('test rule'));
    });

    it('should create a rule with joins properly', () => {
        flow.rule('test rule2', [
            [String, 's', "s == 'hello'"],
            [String, 's2', "s2 == 'world'"],
            [String, 's3', "s3 == 'Hi'"],
        ], () => {
            called += 1;
        });
        assert(flow.containsRule('test rule2'));
    });

    it('should create a rules that are dependent on eachother properly', () => {
        flow.rule('test rule3', [
            [String, 's', "s == 'hello'"],
            [String, 's2', "s2 == 'world'"],
            [String, 's3', "s3 == 'Hi'"],
        ], () => {
            called += 1;
        });
        assert(flow.containsRule('test rule3'));

        flow.rule('test rule4', [
            [String, 's1'],
            [String, 's2', "s2 == 'world' && s1 == 'hello' "],
            [String, 's3', "s3 == 'Hi'"],
            [String, 's4', "s4 == 'what'"],
            [String, 's5', "s5 == 'for'"],
        ], () => {
            called += 1;
        });
        assert(flow.containsRule('test rule4'));
    });
});
