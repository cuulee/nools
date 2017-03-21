'use strict';

const utils = require('../../util');
const ruleTokens = require('./ruleTokens');

const RULE_REG_EXP = /^rule\s*/;
const RULE_NAME_REG_EXP = /^([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')/;
const LEADING_AND_TRAILING_QUOTES_REG_EXP = /^["']|["']$/g;

function ruleParser(orig, context, parse) {
    let src = orig.replace(RULE_REG_EXP, utils.EMPTY_STRING);
    let name = src.match(RULE_NAME_REG_EXP);
    if (name) {
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) === utils.LEFT_CURLY) {
            name = name[1].replace(LEADING_AND_TRAILING_QUOTES_REG_EXP, utils.EMPTY_STRING);
            const rule = {name, options: {}, constraints: null, action: null};
            const body = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
                .join(utils.EMPTY_STRING);
            src = src.replace(body, utils.EMPTY_STRING);
            parse(utils.trimCurlies(body), ruleTokens, rule);
            context.rules.push(rule);
            return src;
        }
        throw new Error(`unexpected token : expected : '{' found : '${utils.findNextToken(src)}'`);
    } else {
        throw new Error('missing name');
    }
}

module.exports = {
    rule: ruleParser,
};
