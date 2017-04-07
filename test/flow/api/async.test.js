'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('async actions', () => {
    class Message {
        constructor(message) {
            this.message = message;
        }
    }

    const flow = nools.flow('async flow', (builder) => {
        builder.rule('Hello', [Message, 'm', "m.message == 'hello'"], (facts, session, next) => {
            setTimeout(() => {
                next();
            }, 500);
        });

        builder.rule('Goodbye', [Message, 'm', "m.message == 'hello goodbye'"], (facts, session, next) => {
            setTimeout(() => {
                next();
            }, 500);
        });
    });

    it('should fire all rules', () => {
        const fired = [];
        const session = flow.getSession(new Message('hello'), new Message('hello goodbye'))
            .on('fire', (name) => {
                fired.push(name);
            });
        return session.match().then(() => {
            assert.deepEqual(fired, ['Goodbye', 'Hello']);
        });
    }).timeout(2000);
});
