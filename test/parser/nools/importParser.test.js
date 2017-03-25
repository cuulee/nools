'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const ImportParser = require('../../../lib/parser/nools/importParser');
const ParserContext = require('../../../lib/parser/nools/parserContext');


describe('ImportParser', () => {
    if (typeof window === 'undefined') {
        const readFileSyncOrig = fs.readFileSync;

        afterEach(() => {
            fs.readFileSync = readFileSyncOrig;
        });


        it('should parse a relative path and default to process.cwd()', () => {
            let called = false;
            fs.readFileSync = (file, encoding) => {
                assert.equal(file, path.resolve(process.cwd(), './test.nools').replace(/\\/g, '/'));
                assert.equal(encoding, 'utf8');
                called = true;
                return '';
            };
            const parser = new ImportParser(new ParserContext('import("./test.nools")', null, null));
            parser.parse();
            assert(called);
        });

        it('should parse a relative path and use the file path', () => {
            let called = false;
            fs.readFileSync = function (file, encoding) {
                assert.equal(file, path.resolve('./rules', './test.nools').replace(/\\/g, '/'));
                assert.equal(encoding, 'utf8');
                called = true;
                return '';
            };
            const parser = new ImportParser(new ParserContext('import("./test.nools")', './rules/test.nools', null));
            parser.parse();
            assert(called);
        });

        it('should parse a absolute path and not change the location ', () => {
            let called = false;
            fs.readFileSync = function (file, encoding) {
                assert.equal(file, path.resolve('/rules/test.nools').replace(/\\/g, '/'));
                assert.equal(encoding, 'utf8');
                called = true;
                return '';
            };
            const parser = new ImportParser(new ParserContext('import("/rules/test.nools")', './rules/test.nools', null));
            parser.parse();
            assert(called);
        });

        it("should should parse import with optional ';'", () => {
            let called = false;
            fs.readFileSync = function (file, encoding) {
                assert.equal(file, path.resolve('/rules/test.nools').replace(/\\/g, '/'));
                assert.equal(encoding, 'utf8');
                called = true;
                return '';
            };
            const parser = new ImportParser(new ParserContext("import('/rules/test.nools');", './rules/test.nools', null));
            parser.parse();
            assert(called);
        });

        it('should merge imported nools file into the current file', () => {
            const source = require.resolve('./rules/import.nools');
            const parser = new ImportParser(new ParserContext(fs.readFileSync(source, 'utf8'), source, null));
            const context = parser.parse();
            assert.deepEqual(context.loaded, [
                require.resolve('./rules/import/import3.nools').replace(/\\/g, '/'),
                require.resolve('./rules/import/import2.nools').replace(/\\/g, '/'),
                require.resolve('./rules/import/import1.nools').replace(/\\/g, '/'),
            ]);
            assert.equal(context.file, source);
        });

        it('should throw an error if the file location contains more than one', () => {
            const parser = new ImportParser(new ParserContext("import('/rules/test.nools', './test.nools')", './rules/test.nools', null));
            assert.throws(() => {
                parser.parse();
            }, /import accepts a single file/);
        });

        it('should throw an error if the first token after import is not a (', () => {
            const parser = new ImportParser(new ParserContext("import '/rules/test.nools'", './rules/test.nools', null));
            assert.throws(() => {
                parser.parse();
            }, /Unexpected token. Expected '\(' found ''' in source 'import '\/rules\/test.nools''/);
        });
    }
});

