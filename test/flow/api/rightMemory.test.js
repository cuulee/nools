'use strict';

const assert = require('assert');
const is = require('is-extended');
const Context = require('../../../lib/flow/rule/nodes/context');
const WorkingMemory = require('../../../lib/flow/workingMemory').WorkingMemory;
const RightMemory = require('../../../lib/flow/rule/nodes/misc/rightMemory');

describe('BetaNode RightMemory', () => {
    it('should add a context to the memory', () => {
        const wm = new WorkingMemory();
        const rm = new RightMemory();
        const fact = wm.assertFact('s');
        const context = new Context(fact);
        rm.push(context);
        assert.equal(rm.length, 1);
    });

    it('should remove a context from the memory', () => {
        const wm = new WorkingMemory();
        const rm = new RightMemory();
        const fact = wm.assertFact('s');
        const context = new Context(fact);
        const node = rm.push(context);
        assert.equal(rm.length, 1);
        rm.remove(node);
        assert.equal(rm.length, 0);
    });

    it('should addIndexes to the memory', () => {
        const rm = new RightMemory();
        rm.addIndex('a.s', 's.a');
        assert(rm.indexes.length === 1);
        const index = rm.indexes[0];
        assert.equal(index[1], 's.a');
        assert.equal(index[0], 'a.s');
        assert(is.isFunction(index[2]));
        assert(is.isFunction(index[3]));
        assert.equal(index[4], 'eq');
        assert.deepEqual(index[3]({s: {a: 1}}), 1);
        assert.deepEqual(index[2]({a: {s: 1}}), 1);
    });

    it('should add an index and accept an operator', () => {
        const rm = new RightMemory();
        rm.addIndex('a.s', 's.a', 'neq');
        assert(rm.indexes.length === 1);
        const index = rm.indexes[0];
        assert.equal(index[0], 'a.s');
        assert.equal(index[1], 's.a');
        assert(is.isFunction(index[2]));
        assert(is.isFunction(index[3]));
        assert.equal(index[4], 'neq');
        assert.deepEqual(index[2]({a: {s: 1}}), 1);
        assert.deepEqual(index[3]({s: {a: 1}}), 1);
    });

    it('should add a context and index it', () => {
        const wm = new WorkingMemory();
        const rm = new RightMemory();
        const rightFact = wm.assertFact({s: 1});
        const rightContext = new Context(rightFact);
        rightContext.set('a', {s: 1});
        rm.addIndex('a.s', 's.a');
        const node = rm.push(rightContext);
        assert.equal(rm.length, 1);
        assert('a.s' in rm.tables.tables);
        assert(rm.tables.tables['a.s'].contains(1));
        assert.deepEqual(rm.tables.tables['a.s'].get(1).tuples, [node]);
    });

    it('should remove a context and unindex it', () => {
        const wm = new WorkingMemory();
        const rm = new RightMemory();
        const rightFact = wm.assertFact({s: 1});
        const rightContext = new Context(rightFact);
        rightContext.set('a', {s: 1});
        rm.addIndex('a.s', 's.a');
        const node = rm.push(rightContext);
        assert.equal(rm.length, 1);
        rm.remove(node);
        assert(rm.tables.tables['a.s'].get(1) === undefined);
    });

    describe('.getRightMemory', () => {
        it('should return the correct right memory values', () => {
            const wm = new WorkingMemory();
            const rm = new RightMemory();
            const rightFact = wm.assertFact({s: 1});
            const leftFact = wm.assertFact({a: 1});
            const rightContext = new Context(rightFact);
            const leftContext = new Context(leftFact);
            rightContext.set('a', {s: 1});
            leftContext.set('s', {a: 1});
            rm.addIndex('a.s', 's.a');
            const node = rm.push(rightContext);
            assert.equal(rm.length, 1);
            let nodes = rm.getRightMemory(leftContext);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node]);
            leftContext.set('s', {a: 2});
            nodes = rm.getRightMemory(leftContext);
            assert(nodes.length === 0);
        });

        it('should return the intersection of all indexes', () => {
            const wm = new WorkingMemory();
            const rm = new RightMemory();
            const rightContext1 = new Context(wm.assertFact({s: 1}));
            const leftContext1 = new Context(wm.assertFact({a: 1}));
            const rightContext2 = new Context(wm.assertFact({s: 2}));
            const leftContext2 = new Context(wm.assertFact({a: 3}));
            rightContext1.set('a', {s: 1, b: 2, c: 2});
            leftContext1.set('s', {a: 1, b: 2, c: 1});
            rightContext2.set('a', {s: 1, b: 3, c: 3});
            leftContext2.set('s', {a: 1, b: 4, c: 3});
            rm.addIndex('a.s', 's.a');
            rm.addIndex('a.b', 's.b');
            rm.addIndex('a.c', 's.c', 'neq');
            const node1 = rm.push(rightContext1);
            rm.push(rightContext2);
            assert.equal(rm.length, 2);
            let nodes = rm.getRightMemory(leftContext1);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node1]);
            nodes = rm.getRightMemory(leftContext2);
            assert(nodes.length === 0);
        });

        it('should find intersection of multiple neq', () => {
            const wm = new WorkingMemory();
            const rm = new RightMemory();
            const rightContext1 = new Context(wm.assertFact({s: 1}));
            const rightContext2 = new Context(wm.assertFact({s: 1}));
            const leftContext1 = new Context(wm.assertFact({a: 1}));
            const leftContext2 = new Context(wm.assertFact({a: 3}));
            rightContext1.set('a', {s: 1});
            rightContext2.set('a', {s: 3});
            leftContext1.set('s', {a: 1, b: 2, c: 1});
            leftContext2.set('s', {a: 2, b: 3, c: 4});
            rm.addIndex('a.s', 's.a', 'neq');
            rm.addIndex('a.s', 's.b', 'neq');
            rm.addIndex('a.s', 's.c', 'neq');
            const node1 = rm.push(rightContext1);
            const node2 = rm.push(rightContext2);
            assert.equal(rm.length, 2);
            let nodes = rm.getRightMemory(leftContext1);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node2]);
            nodes = rm.getRightMemory(leftContext2);
            assert(nodes.length === 1);
            assert.deepEqual(nodes, [node1]);
        });
    });
});
