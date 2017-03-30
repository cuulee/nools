'use strict';

const assert = require('assert');
const flow = require('../rules/defined-compiled')();

const Point = flow.getDefined('point');
const Line = flow.getDefined('line');

describe('compiled - defined objects', () => {
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
