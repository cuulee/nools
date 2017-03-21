'use strict';

const utils = require('../../util');

const DEFINE_REGEXP = /^define\s*/;

function define(orig, context) {
    let src = orig.replace(DEFINE_REGEXP, utils.EMPTY_STRING);
    let name = src.match(utils.IDENTIFIER_REG_EXP);
    if (name) {
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.LEFT_CURLY) {
            name = name[1];
            const body = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
                .join(utils.EMPTY_STRING);
            src = src.replace(body, utils.EMPTY_STRING);
            // should
            context.define.push({name, properties: `(${body})`});
            return src;
        }
        throw new Error(`unexpected token : expected : ${utils.LEFT_CURLY} found : '${utils.findNextToken(src)}'`);
    } else {
        throw new Error('missing name');
    }
}

module.exports = {
    define,
};
