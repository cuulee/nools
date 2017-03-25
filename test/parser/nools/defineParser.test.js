'use strict';

const assert = require('assert');
const DefineParser = require('../../../lib/parser/nools/defineParser');
const ParserContext = require('../../../lib/parser/nools/parserContext');

describe('DefineParser', () => {
    it('should parse a define statement with properties', () => {
        const parser = new DefineParser(new ParserContext("define Test {myProp : 'value'}", 'define.test', null));
        const context = parser.parse();
        assert.deepEqual(context.define, [
            {
                name: 'Test',
                properties: "({myProp : 'value'})",
            },
        ]);
        assert(context.rules.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should parse a define statement with a method', () => {
        const parser = new DefineParser(new ParserContext('define Test {myFunc : function(){}}', 'define.test', null));
        const context = parser.parse();
        assert.deepEqual(context.define, [
            {
                name: 'Test',
                properties: '({myFunc : function(){}})',
            },
        ]);
        assert(context.rules.length === 0);
        assert(context.scope.length === 0);
        assert(context.loaded.length === 0);
    });

    it('should throw an error when the define block is missing a name', () => {
        const parser = new DefineParser(new ParserContext("define {myProp : 'value'}", 'define.test', null));
        assert.throws(() => {
            parser.parse();
        }, /"define" missing name./);
    });

    it('should throw an error if there is a missing right curly', () => {
        const parser = new DefineParser(new ParserContext("define Test {myProp : 'value'", 'define.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Expected to find token '}' in source '\{myProp : 'value''/);
    });

    it('should throw an error is there is a missing left curly', () => {
        const parser = new DefineParser(new ParserContext("define Test myProp : 'value'}", 'define.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Unexpected token. Expected '\{' found 'm' in source 'define Test myProp : 'value'}'/);
    });
});
