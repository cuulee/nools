'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - rules with provided scope', () => {
    const matches = (str, regex) => {
        return regex.test(str);
    };
    const flow = nools.compile(resolve(__dirname, '../rules/provided-scope.nools'), {scope: {doesMatch: matches}});
    const Message = flow.getDefined('Message');

    it('should call the scoped function', (next) => {
        const session = flow.getSession();
        const m = new Message('hello');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    });
});

describe('dsl - scoped functions', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/scope.nools'));
    const Message = flow.getDefined('Message');

    it('should call the scoped function', (next) => {
        const session = flow.getSession();
        const m = new Message('hello');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    });
});
