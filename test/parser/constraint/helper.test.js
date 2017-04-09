'use strict';

const assert = require('assert');
const parser = require('../../../lib/parser');

const constraintParser = parser.constraint;
const helper = require('../../../lib/parser/constraint/helper');

describe('constraintParser', () => {
    describe('.getIdentifiers', () => {
        it('should create the correct atoms for and expressions', () => {
            let identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource('isFalse(a)'), 'a');
            assert(identifiers.length === 2);
            assert.deepEqual(identifiers, ['isFalse', 'a']);

            identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource('a.b.c == false'), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);

            identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource('a.b() == false'), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);

            identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource('b(a) == false'), 'a');
            assert(identifiers.length === 2);
            assert.deepEqual(identifiers, ['b', 'a']);

            identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource('a in [1,b,c]'), 'a');
            assert(identifiers.length === 3);
            assert.deepEqual(identifiers, ['a', 'b', 'c']);

            identifiers = constraintParser.getIdentifiers(constraintParser.parseConstraintSource("a.hello.length eq 5 && a.myFunc() eq 'hello world'"), 'a');
            assert(identifiers.length === 1);
            assert.deepEqual(identifiers, ['a']);
        });
    });

    describe('.equals', () => {
        it('should return true when equal', () => {
            assert(helper.equal(
                constraintParser.parseConstraintSource("p.soreThroat == true && p.fever in ['mild', 'high']"),
                constraintParser.parseConstraintSource("p.soreThroat == true && p.fever in ['mild', 'high']")));
            assert(helper.equal(
                constraintParser.parseConstraintSource('f.value == -1 && (f.sequence == 1 || f.sequence == 2)'),
                constraintParser.parseConstraintSource('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(helper.equal(constraintParser.parseConstraintSource('a.hello.length eq 5'),
                constraintParser.parseConstraintSource('a.hello.length eq 5')));
            assert(helper.equal(constraintParser.parseConstraintSource('a && b'), constraintParser.parseConstraintSource('a && b')));
            assert(helper.equal(constraintParser.parseConstraintSource('[]'), constraintParser.parseConstraintSource('[]')));
            assert(helper.equal(constraintParser.parseConstraintSource('a.in == [1,2,3]'), constraintParser.parseConstraintSource('a.in == [1,2,3]')));
            assert(helper.equal(constraintParser.parseConstraintSource('a + b'), constraintParser.parseConstraintSource('a + b')));
            assert(helper.equal(constraintParser.parseConstraintSource('a > b'), constraintParser.parseConstraintSource('a > b')));
            assert(helper.equal(constraintParser.parseConstraintSource('a == b'), constraintParser.parseConstraintSource('a == b')));
            assert(helper.equal(constraintParser.parseConstraintSource('a && b || c'), constraintParser.parseConstraintSource('a && b || c')));
            assert(helper.equal(constraintParser.parseConstraintSource('hello()'), constraintParser.parseConstraintSource('hello()')));
            assert(helper.equal(constraintParser.parseConstraintSource('a.hello(a, b)'), constraintParser.parseConstraintSource('a.hello(a, b)')));
            assert(helper.equal(constraintParser.parseConstraintSource('hello(a, b, c, e)'), constraintParser.parseConstraintSource('hello(a, b, c, e)')));
            assert(helper.equal(constraintParser.parseConstraintSource("Date('2001-02-01')"), constraintParser.parseConstraintSource("Date('2001-02-01')")));
        });

        it('should return false when not equal', () => {
            assert(!helper.equal(
                constraintParser.parseConstraintSource('f.value == 1 && (f.sequence == 1 || f.sequence == 2)'),
                constraintParser.parseConstraintSource('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(!helper.equal(
                constraintParser.parseConstraintSource("p.soreThroat == true && p.fever in ['mild', 'high']"),
                constraintParser.parseConstraintSource('f.value == -1 && (f.sequence == 1 || f.sequence == 2)')));
            assert(!helper.equal(
                constraintParser.parseConstraintSource('f.value == -1 && (f.sequence == 1 || f.sequence == 2)'),
                constraintParser.parseConstraintSource("p.soreThroat == true && p.fever in ['mild', 'high']")));
            assert(!helper.equal(constraintParser.parseConstraintSource('a.hello.length eq 5'), constraintParser.parseConstraintSource('a && b')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a && b'), constraintParser.parseConstraintSource('a.hello.length eq 5')));
            assert(!helper.equal(constraintParser.parseConstraintSource('[]'), constraintParser.parseConstraintSource('a.in == [1,2,3]')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a.in == [1,2,3]'), constraintParser.parseConstraintSource('[]')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a + b'), constraintParser.parseConstraintSource('a > b')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a > b'), constraintParser.parseConstraintSource('a + b')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a == b'), constraintParser.parseConstraintSource('a && b || c')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a && b || c'), constraintParser.parseConstraintSource('a == b')));
            assert(!helper.equal(constraintParser.parseConstraintSource('hello()'), constraintParser.parseConstraintSource('a.hello(a, b)')));
            assert(!helper.equal(constraintParser.parseConstraintSource('a.hello(a, b)'), constraintParser.parseConstraintSource('hello()')));
            assert(!helper.equal(constraintParser.parseConstraintSource('hello(a, b, c, e)'), constraintParser.parseConstraintSource("Date('2001-02-01')")));
            assert(!helper.equal(constraintParser.parseConstraintSource("Date('2001-02-01')"), constraintParser.parseConstraintSource('hello(a, b, c, e)')));
        });
    });

    describe('.getIndexableProperties', () => {
        it('should get properties with no functions', () => {
            const operators = ['==', '!=', '>', '>=', '<', '<='];
            for (let i = 0, l = operators.length; i < l; i++) {
                const op = operators[i];
                let props = helper.getIndexableProperties(constraintParser.parseConstraintSource(`a ${op} b`), 'a');
                assert.deepEqual(props, ['a', 'b']);
                props = helper.getIndexableProperties(constraintParser.parseConstraintSource(`a.b ${op} b`), 'a');
                assert.deepEqual(props, ['a.b', 'b']);
                props = helper.getIndexableProperties(constraintParser.parseConstraintSource(`a ${op} b.c`), 'a');
                assert.deepEqual(props, ['a', 'b.c']);
                props = helper.getIndexableProperties(constraintParser.parseConstraintSource(`a.b.c.d ${op} b.c.d.e `), 'a');
                assert.deepEqual(props, ['a.b.c.d', 'b.c.d.e']);
                props = helper.getIndexableProperties(constraintParser.parseConstraintSource(`(a ${op} b)`), 'a');
                assert.deepEqual(props, ['a', 'b']);
            }
        });

        it('should not get non indexable constraints', () => {
            let props = helper.getIndexableProperties(constraintParser.parseConstraintSource('a.b.c.d == b.c.d.e || a.b.c == b.c.d '), 'a');
            assert.deepEqual(props, []);

            props = helper.getIndexableProperties(constraintParser.parseConstraintSource('a.b.c.d == b.c.d.e || a.b.c == b.c.d && c.d.e == d.e.f '), 'a');
            assert.deepEqual(props, []);
            props = helper.getIndexableProperties(constraintParser.parseConstraintSource('f3.sequence == s2 + 1'));
            assert.deepEqual(props, []);
        });

        it('should not get properties with functions', () => {
            const props = helper.getIndexableProperties(constraintParser.parseConstraintSource('a() == b()'), 'a');
            assert.deepEqual(props, []);
        });
    });
});
