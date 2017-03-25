'use strict';


const assert = require('assert');
const RuleParser = require('../../../lib/parser/nools/ruleParser');
const ParserContext = require('../../../lib/parser/nools/parserContext');

describe('RuleParser', () => {

    it('should parse a simple rule', () => {
        const parser = new RuleParser(new ParserContext("rule TestRule {when {c : Clazz c.name eq 'Test';} then {console.log(test);}}", 'rule.test', null));
        const context = parser.parse();
        assert(context.rules.length === 1);
        const rule = context.rules[0];
        assert.equal(rule.name, 'TestRule');
        assert.deepEqual(rule.constraints, [
            ['Clazz', 'c', "c.name eq 'Test'"],
        ]);
        assert.equal(rule.action, 'console.log(test);');
        assert.deepEqual(rule.options, {});
        assert(context.define.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should parse rules with a string name in double quotes and e', () => {
        const parser = new RuleParser(new ParserContext('rule "' + 'test rule' + '"' + " { when { c : Clazz {test : test} c.name eq 'Test';} then {console.log($test);}}", 'rule.test', null));
        const context = parser.parse();
        assert(context.rules.length === 1);
        const rule = context.rules[0];
        assert.equal(rule.name, 'test rule');
        assert.deepEqual(rule.constraints, [
            ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
        ]);
        assert.equal(rule.action, 'console.log($test);');
        assert.deepEqual(rule.options, {});
        assert(context.define.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should parse rules with a string name in single quotes', () => {
        const parser = new RuleParser(new ParserContext("rule 'test rule' { when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'rule.test', null));
        const context = parser.parse();
        assert(context.rules.length === 1);
        const rule = context.rules[0];
        assert.equal(rule.name, 'test rule');
        assert.deepEqual(rule.constraints, [
            ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
        ]);
        assert.equal(rule.action, 'console.log($test);');
        assert.deepEqual(rule.options, {});
        assert(context.define.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should parse rules with a string name with inner strings', () => {
        const parser = new RuleParser(new ParserContext("rule 'test \"rule\"' { when { c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'rule.test', null));
        const context = parser.parse();
        assert(context.rules.length === 1);
        const rule = context.rules[0];
        assert.equal(rule.name, 'test "rule"');
        assert.deepEqual(rule.constraints, [
            ['Clazz', 'c', "c.name eq 'Test'", {test: 'test'}],
        ]);
        assert.equal(rule.action, 'console.log($test);');
        assert.deepEqual(rule.options, {});
        assert(context.define.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });


    it('should throw an error if missing the left curly', () => {
        const parser = new RuleParser(new ParserContext("rule TestRule when {c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}}", 'rule.test', null));
        assert.throws(() => {
            // missing starting curly
            parser.parse();
        }, /Unexpected token\. Expected '\{' found 'w' in source 'rule TestRule when \{c : Clazz c\.name eq 'Test' \{test : test}} then \{console\.log\(\$test\);}}'/);
    });

    it('should throw an error if mising the ending right curly', () => {
        const parser = new RuleParser(new ParserContext("rule TestRule { when {c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}", 'rule.test', null));
        assert.throws(() => {
            // missing end curly
            parser.parse();
        }, /Expected to find token '}' in source '\{ when \{c : Clazz c.name eq 'Test' \{test : test}} then \{console\.log\(\$test\);}'/);
    });

    it('should throw an error if an extra token is found', () => {
        // added colon
        const parser = new RuleParser(new ParserContext("rule TestRule : { when {c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}", 'rule.test', null));
        assert.throws(() => {
            // missing end curly
            parser.parse();
        }, /Unexpected token\. Expected '\{' found ':' in source 'rule TestRule : \{ when \{c : Clazz c.name eq 'Test' \{test : test}} then {console\.log\(\$test\);\}'/);
    });

    it('should throw an error for a missing name', () => {
        const parser = new RuleParser(new ParserContext("rule { when {c : Clazz c.name eq 'Test' {test : test}} then {console.log($test);}", 'rule.test', null));
        assert.throws(() => {
            parser.parse();
        }, /"rule" missing name in 'rule \{ when \{c : Clazz c.name eq 'Test' \{test : test}} then \{console\.log\(\$test\);}'/);
    });
});
