'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('events', () => {
    class Message {
        constructor(m) {
            this.message = m;
        }
    }

    const eventsFlow = nools.flow('Events Flow', (flow) => {
        flow.rule('Hello', [Message, 'm', 'm.message =~ /^hello(\\s*world)?$/'], (facts, engine) => {
            engine.modify(facts.m, (m) => {
                m.message += ' goodbye';
            });
        });

        flow.rule('Goodbye', [Message, 'm', 'm.message =~ /.*goodbye$/'], () => {
        });
    });

    let session = null;

    beforeEach(() => {
        session = eventsFlow.getSession();
    });

    it('should emit when facts are asserted', (next) => {
        const m = new Message('hello');
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
        const m = new Message('hello');
        const fire = [
            ['Hello', 'hello'],
            ['Goodbye', 'hello goodbye'],
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
});
