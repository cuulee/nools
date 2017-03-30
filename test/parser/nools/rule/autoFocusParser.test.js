'use strict';

const assert = require('assert');
const AutoFocusParser = require('../../../../lib/parser/nools/rule/autoFocusParser');
const ParserContext = require('../../../../lib/parser/nools/ruleContext');

describe('AutoFocusParser', () => {
    it("should parse rules with a 'auto-focus' as true", () => {
        const parser = new AutoFocusParser(new ParserContext("auto-focus: true; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {autoFocus: true});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it("should parse rules with a 'auto-focus' as false", () => {
        const parser = new AutoFocusParser(new ParserContext("auto-focus: false; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {autoFocus: false});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it("should parse rules with a 'autoFocus' as true", () => {
        const parser = new AutoFocusParser(new ParserContext("autoFocus: true; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {autoFocus: true});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it("should parse rules with a 'autoFocus' as false", () => {
        const parser = new AutoFocusParser(new ParserContext("autoFocus: false; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();

        assert.deepEqual(context.options, {autoFocus: false});
        assert(context.constraints.length === 0);
        assert.equal(context.action, '');
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should throw an error if the value is not true or false', () => {
        const parser = new AutoFocusParser(new ParserContext("autoFocus: h; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        assert.throws(() => parser.parse(), /Invalid auto-focus format in autoFocus: h; when \{ c : Clazz c.name eq 'Test' \{test : test}} then \{console.log\(\$test\);}}/);
    });

    it('should throw an error if the value is numeric', () => {
        const parser = new AutoFocusParser(new ParserContext("autoFocus: 1; when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        assert.throws(() => parser.parse(), /Invalid auto-focus format in autoFocus: 1; when \{ c : Clazz c.name eq 'Test' \{test : test}} then \{console.log\(\$test\);}}/);
    });
});
