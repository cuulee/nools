'use strict';

const assert = require('assert');
const AgendaGroupParser = require('../../../../lib/parser/nools/rule/agendaGroupParser');
const ParserContext = require('../../../../lib/parser/nools/ruleContext');

describe('AgendaGroupParser', () => {
    it("should parse rules with a 'agenda-group'", () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: group1, when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group1'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it("should parse rules with a 'agendaGroup'", () => {
        const parser = new AgendaGroupParser(new ParserContext("agendaGroup: group1, when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group1'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules single quoted names', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: 'group one', when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group one'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules with double quoted names', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: \"group one\", when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group one'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules with nested single quotes', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: \"group 'one'\", when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: "group 'one'"});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules with nested double quotes', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: 'group \"one\"', when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group "one"'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, " when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should parse rules without a comma', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group: group when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {agendaGroup: 'group'});
        assert(context.constraints.length === 0);
        assert.equal(context.action, null);
        assert.equal(context.src, "when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}");
    });

    it('should throw an error of the colon is missing', () => {
        const parser = new AgendaGroupParser(new ParserContext("agenda-group group, when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'agendaGroup.test'));
        assert.throws(() => parser.parse(), /Invalid agenda-group format in source 'agenda-group group, when \{ c : Clazz c\.name eq 'Test' \{test : test}} then \{console\.log\(\$test\);}}/);
    });
});
