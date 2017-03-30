'use strict';

const assert = require('assert');
const nools = require('../../lib');

describe('issue - 122', () => {
    const flow = nools.compile('define Point {x: 0, y: 0, constructor: function(x, y) {this.x = x; this.y = y; } } define Line {points: null, constructor : function() {this.points = []; }, addPoint: function(x, y) {this.points.push(new Point(x,y)); } }', {name: 'issue122'});

    it('should be able to access defined classes within another classes scope', () => {
        const Line = flow.getDefined('Line');
        const myLine = new Line();
        myLine.addPoint(5, 5);
    });
});
