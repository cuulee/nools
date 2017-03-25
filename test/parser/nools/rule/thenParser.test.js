'use strict';

const assert = require('assert');
const ThenParser = require('../../../../lib/parser/nools/rule/thenParser');
const ParserContext = require('../../../../lib/parser/nools/ruleContext');

describe('ThenParser', () => {
    it('should parse a valid then clause', () => {
        const parser = new ThenParser(new ParserContext('then {console.log($test);}', 'thenParser.test'));
        const context = parser.parse();
        assert.deepEqual(context.options, {});
        assert(context.constraints.length === 0);
        assert.equal(context.action, 'console.log($test);');
        assert.equal(context.src, '');
    });

    it('should throw an error if the beginning left curly is missing', () => {
        assert.throws(() => {
            new ThenParser(new ParserContext('then console.log($test);}', 'thenParser.test')).parse();
        }, / Unexpected token. Expected '{' found 'c' in source 'then console.log\(\$test\);}'/);
    });

    it('should throw an error if the end right curly is missing', () => {
        assert.throws(() => {
            new ThenParser(new ParserContext('then {console.log($test);', 'thenParser.test')).parse();
        }, /Expected to find token '}' in source '\{console.log\(\$test\);'/);
    });

    it('should throw an error if there are extra tokens between then and the block', () => {
        assert.throws(() => {
            new ThenParser(new ParserContext('then : {console.log($test);', 'thenParser.test')).parse();
        }, /Unexpected token. Expected '\{' found ':' in source 'then : \{console.log\(\$test\);'/);

        assert.throws(() => {
            new ThenParser(new ParserContext('then ; {console.log($test);', 'thenParser.test')).parse();
        }, /Unexpected token. Expected '\{' found ';' in source 'then ; \{console.log\(\$test\);'/);
    });
});
