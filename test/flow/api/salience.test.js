'use strict';

const assert = require('assert');
const nools = require('../../../lib');

describe('salience', () => {
    /* jshint indent*/
    class Message {
        constructor(name) {
            this.name = name;
        }
    }

    const flow1 = nools.flow('salience1', (builder) => {
        builder.rule('Hello4', {salience: 7}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello3', {salience: 8}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello2', {salience: 9}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello1', {salience: 10}, [Message, 'm', "m.name == 'Hello'"], () => {
        });
    });
    const flow2 = nools.flow('salience2', (builder) => {
        builder.rule('Hello4', {salience: 10}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello3', {salience: 9}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello2', {salience: 8}, [Message, 'm', "m.name == 'Hello'"], () => {
        });

        builder.rule('Hello1', {salience: 7}, [Message, 'm', "m.name == 'Hello'"], () => {
        });
    });


    it('should activate in the proper order', () => {
        const fired1 = [];
        const fired2 = [];
        const session1 = flow1.getSession(new Message('Hello')).on('fire', (name) => {
            fired1.push(name);
        });
        const session2 = flow2.getSession(new Message('Hello')).on('fire', (name) => {
            fired2.push(name);
        });
        return session1.match()
            .then(() => {
                return session2.match();
            })
            .then(() => {
                assert.deepEqual(fired1, ['Hello1', 'Hello2', 'Hello3', 'Hello4']);
                assert.deepEqual(fired2, ['Hello4', 'Hello3', 'Hello2', 'Hello1']);
            });
    });
});
