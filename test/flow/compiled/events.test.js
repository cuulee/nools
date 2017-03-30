'use strict';

const assert = require('assert');
const flow = require('../rules/simple-compiled')();

const Message = flow.getDefined('Message');

describe('compiled - events', () => {
    let session;
    beforeEach(() => {
        session = flow.getSession();
    });

    it('should emit when facts are asserted', (next) => {
        const m = new Message('hello world');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    }).timeout(1000);

    it('should emit when facts are retracted', (next) => {
        const m = new Message('hello world');
        session.once('retract', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
        session.retract(m);
    }).timeout(1000);

    it('should emit when facts are modified', (next) => {
        const m = new Message('hello world');
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
            assert.equal(i, 2);
            next();
        });
    }).timeout(1000);
});
