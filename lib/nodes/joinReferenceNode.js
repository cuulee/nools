'use strict';

const Node = require('./node');
const atoms = require('../atoms');

const DEFUALT_CONSTRAINT = {
    isDefault: true,
    assert() {
        return true;
    },
    equal() {
        return false;
    },
};

const inversions = {
    gt: 'lte',
    gte: 'lte',
    lt: 'gte',
    lte: 'gte',
    eq: 'eq',
    neq: 'neq',
};

function normalizeRightIndexConstraint(rightIndex, indexes, op) {
    if (rightIndex === indexes[1]) {
        return inversions[op];
    }
    return op;
}

function normalizeLeftIndexConstraint(leftIndex, indexes, op) {
    if (leftIndex === indexes[1]) {
        return inversions[op];
    }
    return op;
}

class JoinReferenceNode extends Node {

    constructor(leftMemory, rightMemory) {
        super();
        this.constraint = DEFUALT_CONSTRAINT;
        this.constraintAssert = DEFUALT_CONSTRAINT.assert;
        this.leftMemory = leftMemory;
        this.rightMemory = rightMemory;
    }

    addConstraint(constraint) {
        if (constraint instanceof atoms.ReferenceEqualityAtom) {
            const identifiers = constraint.getIndexableProperties();
            const alias = constraint.alias;
            if (identifiers.length === 2 && alias) {
                const indexes = [];
                let leftIndex = null;
                let rightIndex = null;
                let i = 0;
                while (i < 2) {
                    const index = identifiers[i];
                    if (index.match(new RegExp(`^${alias}(\\.?)`)) === null) {
                        indexes.push(index);
                        leftIndex = index;
                    } else {
                        indexes.push(index);
                        rightIndex = index;
                    }
                    i += 1;
                }
                if (leftIndex && rightIndex) {
                    const op = constraint.op;
                    const leftOp = normalizeLeftIndexConstraint(leftIndex, indexes, op);
                    const rightOp = normalizeRightIndexConstraint(rightIndex, indexes, op);
                    this.rightMemory.addIndex(rightIndex, leftIndex, rightOp);
                    this.leftMemory.addIndex(leftIndex, rightIndex, leftOp);
                }
            }
        }
        if (this.constraint.isDefault) {
            this.constraint = constraint;
            this.isDefault = false;
        } else {
            this.constraint = this.constraint.merge(constraint);
        }
        this.constraintAssert = this.constraint.assert;
    }

    equal(constraint) {
        return this.constraint.equal(constraint.constraint);
    }

    isMatch(lc, rc) {
        return this.constraintAssert(lc.factHash, rc.factHash);
    }

    match(lc, rc) {
        if (this.constraintAssert(lc.factHash, rc.factHash)) {
            return lc.match.merge(rc.match);
        }
        return {isMatch: false};
    }
}

module.exports = JoinReferenceNode;
