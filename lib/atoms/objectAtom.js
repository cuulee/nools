'use strict';

const Atom = require('./atom');

class ObjectAtom extends Atom {
    constructor(objType) {
        super(objType);
        this.type = 'object';
    }

    assert(param) {
        return param instanceof this.constraint || param.constructor === this.constraint;
    }

    equal(constraint) {
        return constraint instanceof this.constructor &&
            this.constraint === constraint.constraint;
    }
}

module.exports = ObjectAtom;
