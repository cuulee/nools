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

    get constraints() {
        return this.leftPattern.constraints.concat(this.rightPattern.constraints);
    }
}

module.exports = CompositePattern;
