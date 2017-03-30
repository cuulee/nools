'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - events', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/simple.nools'));
    const Message = flow.getDefined('Message');

    let session = null;
    beforeEach(() => {
        session = flow.getSession();
    });

    it('should emit when facts are asserted', (next) => {
        const m = new Message('hello ');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    }).timeout(1000);

    it('should emit when facts are retracted', (next) => {
        const m = new Message('hello');
        session.once('retract', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
        session.retract(m);
    }).timeout(1000);

    it('should emit when facts are modified', (next) => {
        const m = new Message('hello');
        session.once('modify', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
        session.modify(m);
    }).timeout(1000);

    it('should emit when rules are fired', (next) => {
        const m = new Message('hello world');
        const fire = [
            ['Hello', 'hello world'],
            ['Goodbye', 'hello world goodbye'],
        ];
        let i = 0;
        session.on('fire', (name, facts) => {
            assert.equal(name, fire[i][0]);
            assert.equal(facts.m.message, fire[i][1]);
            i += 1;
        });
        session.assert(m);
        session.match(() => {
            assert.equal(i, fire.length);
            next();
        });
    }).timeout(1000);

    it('should emit events from within the then action', (next) => {
        session.on('found-goodbye', (message) => {
            assert.equal(message.message, 'hello world goodbye');
            next();
        });
        session.assert(new Message('hello world'));
        session.match();
    }).timeout(1000);
});
