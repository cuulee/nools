'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('#matchUntilHalt', () => {
    class Message {
        constructor(message) {
            this.message = message;
        }
    }

    class Count {
        constructor(count) {
            this.count = count;
        }
    }

    const flow = nools.flow('Match Until Halt Flow', (builder) => {
        builder.rule('Stop', [Count, 'c', 'c.count == 6'], (facts, session) => {
            session.halt();
        });

        builder.rule('Hello', [
            [Count, 'c'],
            [Message, 'm', 'm.message =~ /^hello(\\s*world)?$/'],
        ], (facts, session) => {
            session.modify(facts.m, (m) => {
                m.message += ' goodbye';
            });
            session.modify(facts.c, (c) => {
                c.count += 1;
            });
        });

        builder.rule('Goodbye', [
            [Count, 'c'],
            [Message, 'm', 'm.message =~ /.*goodbye$/'],
        ], (facts, session) => {
            session.retract(facts.m);
            session.modify(facts.c, (c) => {
                c.count += 1;
            });
        });
    });

    it('should match until halt is called', () => {
        const session = flow.getSession();
        let count = 0;
        const called = new Count(0);
        const interval = setInterval(() => {
            if (count >= 3) {
                clearInterval(interval);
            } else {
                session.assert(new Message('hello'));
            }
            count += 1;
        }, 50);
        session.assert(called);
        return session.matchUntilHalt().then((err) => {
            assert(!err);
            assert.equal(called.count, 6);
        });
    });
});
