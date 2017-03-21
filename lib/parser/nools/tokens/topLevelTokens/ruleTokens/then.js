'use strict';

const utils = require('../../../util');

const THEN_REGEXP = /^then\s*/;


function then(orig, context) {
    if (!context.action) {
        let src = orig.replace(THEN_REGEXP, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.LEFT_CURLY) {
            const body = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true).join('');
            src = src.replace(body, utils.EMPTY_STRING);
            if (!context.action) {
                Object.assign(context, {action: utils.trimCurlies(body)});
            }
            if (!utils.isWhiteSpace(src)) {
                throw new Error(`Error parsing then block ${orig}`);
            }
            return src;
        }
        throw new Error(`unexpected token : expected : '{' found : '${utils.findNextToken(src)}'`);
    } else {
        throw new Error(`action already defined for rule ${context.name}`);
    }
}

module.exports = {
    then,
};
