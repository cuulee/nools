'use strict';

const utils = require('../../util');
const fs = require('fs');

const IMPORT_REGEXP = /^import\s*/;
const TRAILING_SEMICOLON_REG_EXP = /\s*;/;

function importParser(orig, context, parse) {
    if (typeof window !== 'undefined') {
        throw new Error('import cannot be used in a browser');
    }
    let src = orig.replace(IMPORT_REGEXP, utils.EMPTY_STRING);
    if (utils.findNextToken(src) === utils.LEFT_PAREN) {
        let file = utils.getParamList(src);
        src = src.replace(file, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.SEMICOLON) {
            src = src.replace(TRAILING_SEMICOLON_REG_EXP, utils.EMPTY_STRING);
        }
        file = utils.trimParens(file).split(utils.COMMA);
        if (file.length === 1) {
            file = utils.resolve(context.file || process.cwd(), utils.trimQuotes(file[0]));
            if (context.loaded.indexOf(file) === -1) {
                const origFile = context.file;
                Object.assign(context, {file});
                // you need to require ./ here so you can access the other tokens
                parse(fs.readFileSync(file, 'utf8'), require('./'), context); // eslint-disable-line
                context.loaded.push(file);
                Object.assign(context, {file: origFile});
            }
            return src;
        }
        throw new Error('import accepts a single file');
    } else {
        throw new Error(`unexpected token : expected : ${utils.LEFT_PAREN} found : '${utils.findNextToken(src)}'`);
    }
}

module.exports = {
    import: importParser,
};
