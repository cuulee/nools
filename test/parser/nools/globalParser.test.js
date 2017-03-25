'use strict';

const assert = require('assert');
const path = require('path');
const GlobalParser = require('../../../lib/parser/nools/globalParser');
const ParserContext = require('../../../lib/parser/nools/parserContext');

describe('GlobalParser', () => {
    it('should parse a require call statement', () => {
        const parser = new GlobalParser(new ParserContext("global util = require('util');", 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'util');
        assert.equal(context.scope[0].body, "require('util')");
    });

    it("should parse a require with a '.' character that is not a relative path", () => {
        const parser = new GlobalParser(new ParserContext("global util = require('socket.io');", 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'util');
        assert.equal(context.scope[0].body, "require('socket.io')");
    });

    it('should resolve relative require paths', () => {
        const parser = new GlobalParser(new ParserContext("global util = require('../util');", 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'util');
        assert.equal(context.scope[0].body, `require('${path.resolve('../rules', '../util').replace(/\\/g, '/')}')`);
    });

    it('should parse a member look up', () => {
        const parser = new GlobalParser(new ParserContext('global PI = Math.PI;', 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'PI');
        assert.equal(context.scope[0].body, 'Math.PI');
    });

    it('should parse a strings', () => {
        const parser = new GlobalParser(new ParserContext("global SOME_STRING = 'This is a test';", 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'SOME_STRING');
        assert.equal(context.scope[0].body, "'This is a test'");
    });

    it('should parse a boolean', () => {
        const parser = new GlobalParser(new ParserContext('global TRUE = true;', 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'TRUE');
        assert.equal(context.scope[0].body, 'true');
    });

    it('should parse numbers', () => {
        const parser = new GlobalParser(new ParserContext('global NUM = 1.23;', 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'NUM');
        assert.equal(context.scope[0].body, '1.23');
    });

    it('should parse a new instantiation', () => {
        const parser = new GlobalParser(new ParserContext('global NOW = new Date();', 'global.test', null));
        const context = parser.parse();
        assert.equal(context.scope[0].name, 'NOW');
        assert.equal(context.scope[0].body, 'new Date()');
    });

    it('should throw an error when the global statement is missing a name', () => {
        const parser = new GlobalParser(new ParserContext("global = require('util');", 'global.test', null));
        assert.throws(() => {
            parser.parse();
        }, / "global" missing name in 'global = require\('util'\);'/);
    });

    it('should throw an error when the global statement is missing a ;', () => {
        const parser = new GlobalParser(new ParserContext("global util = require('util')", 'global.test', null));
        assert.throws(() => {
            parser.parse();
        }, /Expected to find token ';' in source '= require\('util'\)'/);
    });
});
