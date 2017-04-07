'use strict';

const Pattern = require('./pattern');

class CompositePattern extends Pattern {
    constructor(left, right) {
        super();
        this.leftPattern = left;
        this.rightPattern = right;
    }

    hashCode() {
        return `${this.leftPattern.hashCode()}:${this.rightPattern.hashCode()}`;
    }

    getSpecificity() {
        return this.rightPattern.getSpecificity() + this.leftPattern.getSpecificity();
    }

    append(rightPattern) {
        return new this.constructor(this, rightPattern);
    }

    get constraints() {
        return this.leftPattern.constraints.concat(this.rightPattern.constraints);
    }

    static fromPatterns(patterns) {
        if (patterns.length <= 1) {
            return patterns[0] || null;
        } else if (patterns.length === 2) {
            return new this(patterns[0], patterns[1]);
        }
        const startingComposite = new this(patterns[0], patterns[1]);
        // take all elements after the first to and add them to the starting
        // creating a new composite pattern on each iteration
        return patterns.slice(2).reduce((composite, rightPattern) => {
            return composite.append(rightPattern);
        }, startingComposite);
    }
}

module.exports = CompositePattern;
