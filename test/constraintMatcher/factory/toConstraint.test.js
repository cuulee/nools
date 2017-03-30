'use strict';

const assert = require('assert');
const parser = require('../../../lib/parser');
const toConstraints = require('../../../lib/constraintMatcher/factory').toConstraints;

describe('constraintMatcher factory', () => {
    describe('.toConstraints', () => {
        it('should create for expressions', () => {
            let atoms = toConstraints(parser.parseConstraint('isFalse(a)'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'comparison');

            atoms = toConstraints(parser.parseConstraint('a == 1'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'equality');

            atoms = toConstraints(parser.parseConstraint('a != 1'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'inequality');

            atoms = toConstraints(parser.parseConstraint('a > b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_gt');
            assert.equal(atoms[0].op, 'gt');

            atoms = toConstraints(parser.parseConstraint('a >= b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_gte');
            assert.equal(atoms[0].op, 'gte');

            atoms = toConstraints(parser.parseConstraint('a < b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_lt');
            assert.equal(atoms[0].op, 'lt');

            atoms = toConstraints(parser.parseConstraint('a <= b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_lte');
            assert.equal(atoms[0].op, 'lte');


            atoms = toConstraints(parser.parseConstraint('a == b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_equality');
            assert.equal(atoms[0].op, 'eq');

            atoms = toConstraints(parser.parseConstraint('a != b'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference_inequality');

            atoms = toConstraints(parser.parseConstraint('isTrue(b)'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference');

            atoms = toConstraints(parser.parseConstraint('isTrue(b) && isFalse(a)'), {alias: 'a'});
            assert(atoms.length === 2);
            assert.equal(atoms[0].type, 'reference');
            assert.equal(atoms[1].type, 'comparison');

            atoms = toConstraints(parser.parseConstraint('isTrue(b) || isFalse(a)'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference');

            atoms = toConstraints(parser.parseConstraint('isNumber(b) || isFalse(a) && b == 1'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'reference');

            atoms = toConstraints(parser.parseConstraint('(isNumber(b) || isFalse(a)) && b == 1'), {alias: 'a'});
            assert(atoms.length === 2);
            assert.equal(atoms[0].type, 'reference');
            assert.equal(atoms[1].type, 'reference_equality');

            atoms = toConstraints(parser.parseConstraint("a.name == 'bob' && isFalse(a.flag) && b == 1"), {alias: 'a'});
            assert(atoms.length === 3);
            assert.equal(atoms[0].type, 'equality');
            assert.equal(atoms[1].type, 'comparison');
            assert.equal(atoms[2].type, 'reference_equality');

            atoms = toConstraints(parser.parseConstraint("a.name == 'bob' && !a.flag && b == 1"), {alias: 'a'});
            assert(atoms.length === 3);
            assert.equal(atoms[0].type, 'equality');
            assert.equal(atoms[1].type, 'comparison');
            assert.equal(atoms[2].type, 'reference_equality');

            atoms = toConstraints(parser.parseConstraint('!(a.bool && a.bool2)'), {alias: 'a'});
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'comparison');
        });

        it('should create correct pattern depending on scope', () => {
            const atoms = toConstraints(parser.parseConstraint('isEmail(a)'), {
                alias: 'a',
                scope: {
                    isEmail() {
                    },
                },
            });
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'comparison');

            const atoms2 = toConstraints(parser.parseConstraint('isEmail(a)'), {alias: 'a'});
            assert(atoms2.length === 1);
            assert.equal(atoms2[0].type, 'reference');
        });

        it('should return a custom CustomConstraint if called with a function', () => {
            const atoms = toConstraints(() => {
                return true;
            });
            assert(atoms.length === 1);
            assert.equal(atoms[0].type, 'custom');
        });
    });
});
