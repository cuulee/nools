'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - agenda-groups', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/agenda-group.nools'));
    const Message = flow.getDefined('message');

    let session = null;
    beforeEach(() => {
        session = flow.getSession();
    });

    it('should only fire events in focused group', () => {
        let events = [];
        session.assert(new Message('hello'));
        session.focus('ag1');
        session.on('fire', (name) => {
            events.push(name);
        });
        return session.match()
            .then(() => {
                assert.deepEqual(events, ['Hello World', 'GoodBye']);
                events = [];
                session = flow.getSession();
                session.assert(new Message('hello'));
                session.focus('ag2');
                session.on('fire', (name) => {
                    events.push(name);
                });
                return session.match().then(() => {
                    assert.deepEqual(events, ['Hello World 2', 'GoodBye 2']);
                });
            });
    });

    it('should should treat focus like a stack', () => {
        let events = [];
        session.assert(new Message('hello'));
        session.focus('ag2');
        session.focus('ag1');
        session.on('fire', (name) => {
            events.push(name);
        });
        return session.match()
            .then(() => {
                assert.deepEqual(events, ['Hello World', 'GoodBye', 'GoodBye 2']);
                events = [];
                session = flow.getSession();
                session.assert(new Message('hello'));
                session.focus('ag1');
                session.focus('ag2');
                session.on('fire', (name) => {
                    events.push(name);
                });
                return session.match().then(() => {
                    assert.deepEqual(events, ['Hello World 2', 'GoodBye 2', 'GoodBye']);
                });
            });
    });
});
