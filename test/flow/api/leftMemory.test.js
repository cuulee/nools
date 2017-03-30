'use strict';

const assert = require('assert');
const Context = require('../../../lib/context');
const is = require('is-extended');
const WorkingMemory = require('../../../lib/workingMemory').WorkingMemory;
const LeftMemory = require('../../../lib/nodes/misc/leftMemory');

describe('BetaNode LeftMemory', () => {
    it('should add a context to the memory', () => {
        const wm = new WorkingMemory();
        const lm = new LeftMemory();
        const context = new Context(wm.assertFact('s'));
        lm.push(context);
        assert.equal(lm.length, 1);
    });

    it('should remove a context from the memory', () => {
        const wm = new WorkingMemory();
        const lm = new LeftMemory();
        const context = new Context(wm.assertFact('s'));
        const node = lm.push(context);
        assert.equal(lm.length, 1);
        lm.remove(node);
        assert.equal(lm.length, 0);
    });

    it('should addIndexes to the memory', () => {
        const lm = new LeftMemory();
        lm.addIndex('s.a', 'a.s');
        assert(lm.indexes.length === 1);
        const index = lm.indexes[0];
        assert.equal(index[0], 's.a');
        assert.equal(index[1], 'a.s');
        assert(is.isFunction(index[2]));
        assert(is.isFunction(index[3]));
        assert.equal(index[4], 'eq');
        assert.deepEqual(index[2]({s: {a: 1}}), 1);
        assert.deepEqual(index[3]({a: {s: 1}}), 1);
    });

    it('should add an index and accept an operator', () => {
        const lm = new LeftMemory();
        lm.addIndex('s.a', 'a.s', 'neq');
        assert(lm.indexes.length === 1);
        const index = lm.indexes[0];
        assert.equal(index[0], 's.a');
        assert.equal(index[1], 'a.s');
        assert(is.isFunction(index[2]));
        assert(is.isFunction(index[3]));
        assert.equal(index[4], 'neq');
        assert.deepEqual(index[2]({s: {a: 1}}), 1);
        assert.deepEqual(index[3]({a: {s: 1}}), 1);
    });

    it('should add a context and index it', () => {
        const wm = new WorkingMemory();
        const lm = new LeftMemory();
        const leftFact = wm.assertFact({a: 1});
        const leftContext = new Context(leftFact);
        leftContext.set('s', {a: 1});
        lm.addIndex('s.a', 'a.s');
        const node = lm.push(leftContext);
        assert.equal(lm.length, 1);
        assert('s.a' in lm.tables.tables);
        assert(lm.tables.tables['s.a'].contains(1));
        assert.deepEqual(lm.tables.tables['s.a'].get(1).tuples, [node]);
    });

    it('should remove a context and unindex it', () => {
        const wm = new WorkingMemory();
        const rm = new LeftMemory();
        const leftFact = wm.assertFact({a: 1});
        const leftContext = new Context(leftFact);
        leftContext.set('s', {a: 1});
        rm.addIndex('s.a', 'a.s');
        const node = rm.push(leftContext);
        assert.equal(rm.length, 1);
        rm.remove(node);
        assert(rm.tables.tables['s.a'].get(1) === undefined);
    });

    describe('.getLeftMemory', () => {
        it('should return the correct right memory values', () => {
            const wm = new WorkingMemory();
            const lm = new LeftMemory();
            const rightFact = wm.assertFact({s: 1});
            const leftFact = wm.assertFact({a: 1});
            const rightContext = new Context(rightFact);
            const leftContext = new Context(leftFact);
            rightContext.set('a', {s: 1});
            leftContext.set('s', {a: 1});
            lm.addIndex('s.a', 'a.s');
            const node = lm.push(leftContext);
            assert.equal(lm.length, 1);
            let nodes = lm.getLeftMemory(rightContext);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node]);
            rightContext.set('a', {s: 2});
            nodes = lm.getLeftMemory(rightContext);
            assert(nodes.length === 0);
        });

        it('should return the intersection of all indexes', () => {
            const wm = new WorkingMemory();
            const lm = new LeftMemory();
            const rightContext1 = new Context(wm.assertFact({s: 1}));
            const leftContext1 = new Context(wm.assertFact({a: 1}));
            const rightContext2 = new Context(wm.assertFact({s: 2}));
            const leftContext2 = new Context(wm.assertFact({a: 3}));
            rightContext1.set('a', {s: 1, b: 2, c: 1});
            leftContext1.set('s', {a: 1, b: 2, c: 2});
            rightContext2.set('a', {s: 1, b: 3, c: 3});
            leftContext2.set('s', {a: 1, b: 4, c: 3});
            lm.addIndex('s.c', 'a.c', 'neq');
            lm.addIndex('s.a', 'a.s');
            lm.addIndex('s.b', 'a.b');
            const node1 = lm.push(leftContext1);
            lm.push(leftContext2);
            assert.equal(lm.length, 2);
            let nodes = lm.getLeftMemory(rightContext1);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node1]);
            nodes = lm.getLeftMemory(rightContext2);
            assert(nodes.length === 0);
        });

        it('should find intersection of multiple neq', () => {
            const wm = new WorkingMemory();
            const rm = new LeftMemory();
            const rightContext1 = new Context(wm.assertFact({s: 1}));
            const rightContext2 = new Context(wm.assertFact({s: 1}));
            const leftContext1 = new Context(wm.assertFact({a: 1}));
            const leftContext2 = new Context(wm.assertFact({a: 3}));
            rightContext1.set('a', {s: 1});
            rightContext2.set('a', {s: 3});
            leftContext1.set('s', {a: 1, b: 2, c: 1});
            leftContext2.set('s', {a: 2, b: 3, c: 4});
            rm.addIndex('s.a', 'a.s', 'neq');
            rm.addIndex('s.b', 'a.s', 'neq');
            rm.addIndex('s.c', 'a.s', 'neq');
            const node1 = rm.push(leftContext1);
            const node2 = rm.push(leftContext2);
            assert.equal(rm.length, 2);
            let nodes = rm.getLeftMemory(rightContext1);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node2]);
            nodes = rm.getLeftMemory(rightContext2);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node1]);
        });
    });
});
