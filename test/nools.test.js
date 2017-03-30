'use strict';

const assert = require('assert');
const nools = require('../');

describe('nools', () => {
    describe('.flow', () => {
        it('should create a flow', () => {
            const flow = nools.flow('nools flow');
            assert(flow);
            assert(flow instanceof nools.Flow);
            assert.equal('nools flow', flow.name);
            assert.equal(nools.getFlow('nools flow'), flow);
        });
    });

    describe('.deleteFlow', () => {
        it('should delete a flow by name', () => {
            const flow = nools.flow('delete nools flow');
            assert(flow);
            assert(flow instanceof nools.Flow);
            assert.equal('delete nools flow', flow.name);
            assert.equal(nools.getFlow('delete nools flow'), flow);

            assert.equal(nools.deleteFlow('delete nools flow'), nools);
            assert(!nools.getFlow('delete nools flow'));
        });

        it('should delete a flow using a Flow instance', () => {
            const flow = nools.flow('delete nools flow');
            assert(flow);
            assert(flow instanceof nools.Flow);
            assert.equal('delete nools flow', flow.name);
            assert.equal(nools.getFlow('delete nools flow'), flow);

            assert.equal(nools.deleteFlow(flow), nools);
            assert(!nools.getFlow('delete nools flow'));
        });
    });

    describe('.hasFlow', () => {
        it('should return true if the flow exists', () => {
            const name = 'has flow';
            nools.flow(name);
            assert(nools.hasFlow(name));
        });

        it('should return false if the flow does not exists', () => {
            assert(!nools.hasFlow(new Date().toString()));
        });
    });

    describe('.deleteFlows', () => {
        it('should deleteAllFlows', () => {
            const name = 'delete nools flows';
            nools.flow(name);
            assert(nools.hasFlow(name));
            assert.equal(nools.deleteFlows(), nools);
            assert(!nools.hasFlow(name));
        });
    });
});
