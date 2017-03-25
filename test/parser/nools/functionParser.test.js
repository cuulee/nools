'use strict';

const assert = require('assert');
const FunctionParser = require('../../../lib/parser/nools/functionParser');
const ParserContext = require('../../../lib/parser/nools/parserContext');

describe('FunctionParser', () => {
    it('should parse a function statement', () => {
        const parser = new FunctionParser(new ParserContext('function myFunc(a, b) {return a + b}', 'function.test', null));
        const context = parser.parse();
        assert(context.scope.length === 1);
        assert.equal(context.scope[0].name, 'myFunc');
        assert.equal(context.scope[0].body, 'function(a, b){return a + b}');
        assert(context.rules.length === 0);
        assert(context.define.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should throw an error when the function block is missing a name', () => {
        const parser = new FunctionParser(new ParserContext('function(a,b) {return a + b;}', 'function.test', null));
        assert.throws(() => {
            parser.parse();
        }, /"function" missing name in 'function\(a,b\) \{return a \+ b;}'/);
    });

    it('should throw an error for invalid define blocks', () => {
        const parser = new FunctionParser(new ParserContext("function testFunc() return 'value'}", 'function.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Unexpected token. Expected '\{' found 'r' in source 'function testFunc\(\) return 'value'}'/);
    });

    it('should throw an error if there is not a closing right curly', () => {
        const parser = new FunctionParser(new ParserContext("function testFunc() {return 'value'", 'function.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Expected to find token '}' in source '\{return 'value''/);
    });

    it('should throw an error if there are missing parens', () => {
        const parser = new FunctionParser(new ParserContext("function testFunc {return 'value'}", 'function.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Unexpected token. Expected '\(' found '\{' in source 'function testFunc \{return 'value'}'/);
    });
});
