'use strict';

const utils = require('./util');
const fs = require('fs');
const Parser = require('./parser');
const RootParser = require('./rootParser');

const IMPORT_REGEXP = /^import\s*/;
const TRAILING_SEMICOLON_REG_EXP = /\s*;/;

class ImportParser extends Parser {
    parse() {
        if (typeof window !== 'undefined') {
            throw new Error('import cannot be used in a browser');
        }
        const context = this.context;
        let src = context.src.replace(IMPORT_REGEXP, utils.EMPTY_STRING);
        if (utils.findNextToken(src) !== utils.LEFT_PAREN) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_PAREN, src));
        }
        const importParams = utils.getParamList(src);
        src = src.replace(importParams, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.SEMICOLON) {
            src = src.replace(TRAILING_SEMICOLON_REG_EXP, utils.EMPTY_STRING);
        }
        const files = utils.trimParens(importParams).split(utils.COMMA);
        if (files.length !== 1) {
            throw new Error('import accepts a single file');
        }
        const file = utils.resolve(context.file || process.cwd(), utils.trimQuotes(files[0]));
        if (context.loaded.indexOf(file) !== -1) {
            // we have already loaded the file
            return context.copyWithSrc(src);
        }
        context.loaded.push(file);
        // todo this should create a whole new sub context copy then merge it
        const importSource = fs.readFileSync(file, 'utf8');
        if (importSource) {
            const importContext = context.copyWithSrc(importSource);
            // reassign the file to the file we are parsing
            importContext.file = file;
            new RootParser(importContext).parse();
        }

        return context.copyWithSrc(src);
    }
}

Parser.registerTopLevelParser('import', ImportParser);

module.exports = ImportParser;
