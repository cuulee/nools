'use strict';

const assert = require('assert');
const WhenParser = require('../../../../lib/parser/nools/rule/whenParser');
const ParserContext = require('../../../../lib/parser/nools/ruleContext');

describe('WhenParser', () => {
    it('should parse a simple when', () => {
        const parser = new WhenParser(new ParserContext("when {c : Clazz c.name eq 'Test';}", 'when.test', null));
        const context = parser.parse();
        assert.deepEqual(context.constraints, [
            ['Clazz', 'c', "c.name eq 'Test'"],
        ]);
        assert.equal(context.action, '');
        assert.deepEqual(context.options, {});
    });

    describe('with constraint hash', () => {
        it('should parse a when with a hash', () => {
            const parser = new WhenParser(new ParserContext("when {c : Clazz c.name eq 'Test' {test : test};}", 'when.test', null));
            const context = parser.parse();
            assert.deepEqual(context.constraints, [
                ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
            ]);
            assert.equal(context.action, '');
            assert.deepEqual(context.options, {});
        });

        it('should parse a when with a hash with a non alpha in the key', () => {
            const parser = new WhenParser(new ParserContext("when {c : Clazz c.name eq 'Test' {$test : test};}", 'when.test', null));
            const context = parser.parse();
            assert.deepEqual(context.constraints, [
                ['Clazz', 'c', "c.name eq 'Test'", {$test: 'test'}],
            ]);
            assert.equal(context.action, '');
            assert.deepEqual(context.options, {});
        });

        it('should parse a when with a hash with a spaces', () => {
            const parser = new WhenParser(new ParserContext("when {c : Clazz c.name eq 'Test' { test : test };}", 'when.test', null));
            const context = parser.parse();
            assert.deepEqual(context.constraints, [
                ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
            ]);
            assert.equal(context.action, '');
            assert.deepEqual(context.options, {});
        });

        it('should parse a when with a non alpha char in the alias', () => {
            const parser = new WhenParser(new ParserContext("when {$c : Clazz $c.name eq 'Test'}", 'when.test', null));
            const context = parser.parse();
            assert.deepEqual(context.constraints, [
                ['Clazz', '$c', "$c.name eq 'Test'"],
            ]);
            assert.equal(context.action, '');
            assert.deepEqual(context.options, {});
        });

        it('should parse a when with hash and constraints in any order', () => {
            const parser = new WhenParser(new ParserContext("when { c : Clazz {test : test} c.name eq 'Test';}", 'when.test', null));
            const context1 = parser.parse();
            assert.deepEqual(context1.constraints, [
                ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
            ]);
            assert.equal(context1.action, '');
            assert.deepEqual(context1.options, {});
        });
    });

    describe('with predicates', () => {
        describe('not', () => {
            it('should parse not predicate', () => {
                const parser = new WhenParser(new ParserContext("when {not(c : Clazz {test : test} c.name eq 'Test');}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    ['not', 'Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse not predicate with extra spaces', () => {
                const parser = new WhenParser(new ParserContext("when { not(c : Clazz c.name eq 'Test' {test : test})}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    ['not', 'Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse not predicate with non alpha numerics in constraint', () => {
                const parser = new WhenParser(new ParserContext("when { not($c : Clazz $c.name eq 'Test' {$test : test})}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    ['not', 'Clazz', '$c', "$c.name eq 'Test'", {$test: 'test'}],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });
        });

        describe('or', () => {
            it('should parse or predicate', () => {
                const parser = new WhenParser(new ParserContext("when {or(c : Clazz c.name in ['Test1', 'test2', 'test3'], c : Clazz c.name eq 'Test')}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['Clazz', 'c', "c.name in ['Test1', 'test2', 'test3']"],
                        ['Clazz', 'c', "c.name eq 'Test'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse or predicate with extra spaces', () => {
                const parser = new WhenParser(new ParserContext("when {  or(  c : Clazz c.name in ['Test1', 'test2', 'test3'], c : Clazz c.name eq 'Test'  )  }", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['Clazz', 'c', "c.name in ['Test1', 'test2', 'test3']"],
                        ['Clazz', 'c', "c.name eq 'Test'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse or predicate with non alpha numeric in constraint alias', () => {
                const parser = new WhenParser(new ParserContext("when {or($c : Clazz $c.name in ['Test1', 'test2', 'test3'], $c : Clazz $c.name eq 'Test')}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['Clazz', '$c', "$c.name in ['Test1', 'test2', 'test3']"],
                        ['Clazz', '$c', "$c.name eq 'Test'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse or conditions with more than two constraints', () => {
                const parser = new WhenParser(new ParserContext("when {or($c : Clazz $c.name eq 'test1', $c : Clazz $c.name eq 'test2', $c : Clazz $c.name eq 'test3')}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['Clazz', '$c', "$c.name eq 'test1'"],
                        ['Clazz', '$c', "$c.name eq 'test2'"],
                        ['Clazz', '$c', "$c.name eq 'test3'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse or conditions with nested not predicate', () => {
                const parser = new WhenParser(new ParserContext("when {or($c : Clazz $c.name eq 'test1', not($c : Clazz $c.name eq 'test2'), not($c : Clazz $c.name eq 'test3'), $c: Clazz $c.name == 'test4')}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['Clazz', '$c', "$c.name eq 'test1'"],
                        ['not', 'Clazz', '$c', "$c.name eq 'test2'"],
                        ['not', 'Clazz', '$c', "$c.name eq 'test3'"],
                        ['Clazz', '$c', "$c.name == 'test4'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });


            it('should parse or conditions a not predicate as the first constraint', () => {
                const parser = new WhenParser(new ParserContext("when {or(not($c : Clazz $c.name eq 'test1'), $c : Clazz $c.name eq 'test2', $c : Clazz $c.name eq 'test3', $c: Clazz $c.name == 'test4')}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    [
                        'or',
                        ['not', 'Clazz', '$c', "$c.name eq 'test1'"],
                        ['Clazz', '$c', "$c.name eq 'test2'"],
                        ['Clazz', '$c', "$c.name eq 'test3'"],
                        ['Clazz', '$c', "$c.name == 'test4'"],
                    ],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });
        });

        describe('exists', () => {
            it('should parse rules with exists clause', () => {
                const parser = new WhenParser(new ParserContext("when {exists(c : Clazz c.name eq 'Test');}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    ['exists', 'Clazz', 'c', "c.name eq 'Test'"],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });

            it('should parse rules with exists clause with hash', () => {
                const parser = new WhenParser(new ParserContext("when {exists(c : Clazz c.name eq 'Test' {test: t});}", 'when.test', null));
                const context1 = parser.parse();
                assert.deepEqual(context1.constraints, [
                    ['exists', 'Clazz', 'c', "c.name eq 'Test'", {test: 't'}],
                ]);
                assert.equal(context1.action, '');
                assert.deepEqual(context1.options, {});
            });
        });
    });

    describe('with from clause', () => {
        it('should parse a when clause with from', () => {
            const parser = new WhenParser(new ParserContext("when { p : Person p.name eq 'Test'; a: Address a.zipcode == 88847 from p.address;}", 'when.test', null));
            const context1 = parser.parse();
            assert.deepEqual(context1.constraints, [
                ['Person', 'p', "p.name eq 'Test'"],
                ['Address', 'a', 'a.zipcode == 88847 ', 'from p.address'],
            ]);
            assert.equal(context1.action, '');
            assert.deepEqual(context1.options, {});
        });

        it('should parse with a hash also', () => {
            const parser = new WhenParser(new ParserContext("when { p : Person p.name eq 'Test'; a: Address a.zipcode == 88847 {zipcode: zipCode} from p.address;}", 'when.test', null));
            const context1 = parser.parse();
            assert.deepEqual(context1.constraints, [
                ['Person', 'p', "p.name eq 'Test'"],
                ['Address', 'a', 'a.zipcode == 88847', {zipcode: 'zipCode'}, 'from p.address'],
            ]);
            assert.equal(context1.action, '');
            assert.deepEqual(context1.options, {});
        });
    });

    it('should throw an error is there is a missing beginning left curly', () => {
        const parser = new WhenParser(new ParserContext("when c : Clazz c.name eq 'Test' {test : test}}", 'when.test', null));
        assert.throws(() => parser.parse(), /Unexpected token\. Expected '\{' found 'c' in source 'when c : Clazz c\.name eq 'Test' \{test : test}}'/);
    });

    it('should throw an error if the end right curly is missing', () => {
        const parser = new WhenParser(new ParserContext("when {c : Clazz c.name eq 'Test' {test : test}", 'when.test', null));
        assert.throws(() => parser.parse(), /Expected to find token '}' in source '\{c : Clazz c.name eq 'Test' \{test : test}'/);
    });

    it('should throw an error is there is amissing colon in the constraint', () => {
        const parser = new WhenParser(new ParserContext("when {c Clazz c.name eq 'Test' {test : test}}", 'when.test', null));
        assert.throws(() => parser.parse(), /Invalid constraint 'c Clazz c\.name eq 'Test' \{test : test}' in source when \{c Clazz c\.name eq 'Test' \{test : test}}/);
    });
});
