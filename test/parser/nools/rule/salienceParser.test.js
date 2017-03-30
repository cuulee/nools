'use strict';

const assert = require('assert');
const SalienceParser = require('../../../../lib/parser/nools/rule/salienceParser');
const ParserContext = require('../../../../lib/parser/nools/ruleContext');

describe('SalienceParser', () => {
    it('should parse rules with a "salience"', () => {
        const parser = new SalienceParser(new ParserContext("salience: 10, when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {priority: 10});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules with a "priority"', () => {
        const parser = new SalienceParser(new ParserContext("priority: 10, when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {priority: 10});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });


    it('should parse rules with a salience with a ;', () => {
        const parser = new SalienceParser(new ParserContext("salience: 10; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {priority: 10});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules with a priority with a ;', () => {
        const parser = new SalienceParser(new ParserContext("priority: 10; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {priority: 10});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should throw an error if the salience is not a number', () => {
        assert.throws(() => {
            new SalienceParser(new ParserContext("priority: a; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'))
                .parse();
        }, /Invalid salience format in source 'priority: a; when \{ c : Clazz c.name eq 'Test' \{test : test}} then \{console.log\(\$test\);}}'/);
        assert.throws(() => {
            new SalienceParser(new ParserContext("priority: 'a'; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'))
                .parse();
        }, /Invalid salience format in source 'priority: 'a'; when \{ c : Clazz c.name eq 'Test' \{test : test}} then \{console.log\(\$test\);}}'/);

        assert.throws(() => {
            new SalienceParser(new ParserContext("priority: true; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'))
                .parse();
        }, /Invalid salience format in source 'priority: true; when \{ c : Clazz c.name eq 'Test' \{test : test}} then \{console.log\(\$test\);}}'/);
    });
});
