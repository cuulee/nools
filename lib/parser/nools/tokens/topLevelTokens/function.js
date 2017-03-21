'use strict';

const utils = require('../../util');

const FUNCTION_REGEXP = /^function\s*/;
const FUNCTION_PREFIX = 'function';

function functionDefinition(orig, context) {
    let src = orig.replace(FUNCTION_REGEXP, utils.EMPTY_STRING);
    // parse the function name
    let name = src.match(utils.IDENTIFIER_REG_EXP);
    if (name) {
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.LEFT_PAREN) {
            name = name[1];
            const params = utils.getParamList(src);
            src = src.replace(params, utils.EMPTY_STRING).trim();
            if (utils.findNextToken(src) === utils.LEFT_CURLY) {
                const body = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
                    .join(utils.EMPTY_STRING);
                src = src.replace(body, utils.EMPTY_STRING);
                // should
                context.scope.push({name, body: `${FUNCTION_PREFIX}${params}${body}`});
                return src;
            }
            throw new Error(`unexpected token : expected : ${utils.LEFT_CURLY} found : '${utils.findNextToken(src)}'`);
        } else {
            throw new Error(`unexpected token : expected : ${utils.LEFT_PAREN} found : '${utils.findNextToken(src)}'`);
        }
    } else {
        throw new Error('missing name');
    }
}

module.exports = {
    function: functionDefinition,
};
