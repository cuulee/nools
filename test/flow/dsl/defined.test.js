'use strict';

const assert = require('assert');
const nools = require('../../../lib');
const resolve = require('path').resolve;

describe('dsl - defined objects', () => {
    const flow = nools.compile(resolve(__dirname, '../rules/defined.nools'));
    const Point = flow.getDefined('point');
    const Line = flow.getDefined('line');

    it('should allow creating a new defined object', () => {
        const point = new Point(1, 2);
        assert.equal(point.x, 1);
        assert.equal(point.y, 2);
    });

    it('defined classes should have other classes in scope', () => {
        const line = new Line();
        line.addPointFromDefined(1, 2);
        assert(line.points.length === 1);
        const point = line.points[0];
        assert(point instanceof Point);
        assert.equal(point.x, 1);
        assert.equal(point.y, 2);
    });

    it('defined classes should have access to functions in scope', () => {
        const line = new Line();
        line.addPointWithScope(1, 2);
        assert(line.points.length === 1);
        const point = line.points[0];
        assert(point instanceof Point);
        assert.equal(point.x, 1);
        assert.equal(point.y, 2);
    });
});

describe('dsl - externally defined Fact types', () => {
    class Message {
        constructor(message) {
            this.message = message;
        }
    }

    const flow = nools.compile(resolve(__dirname, '../rules/simple-external-defined.nools'), {
        define: {
            Message,
        },
    });

    let session = null;
    beforeEach(() => {
        session = flow.getSession();
    });

    it('should return the externally defined type from getDefined', () => {
        assert.equal(flow.getDefined('message'), Message);
    });

    it('should allow using externally defined Fact types', (next) => {
        const m = new Message('hello');
        session.once('assert', (fact) => {
            assert.deepEqual(fact, m);
            next();
        });
        session.assert(m);
    });
});
