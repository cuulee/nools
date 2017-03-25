'use strict';

const utils = require('../util');
const Parser = require('../parser');

const THEN_REGEXP = /^then\s*/;

class ThenParser extends Parser {
    parse() {
        if (this.context.action) {
            throw new Error(`action already defined for rule ${context.name}`);
        }
        let src = this.context.src.replace(THEN_REGEXP, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_CURLY) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_CURLY, src));
        }
        const thenBody = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true).join('');
        this.context.action = utils.trimCurlies(thenBody);
        src = src.replace(thenBody, utils.EMPTY_STRING);
        if (!utils.isWhiteSpace(src)) {
            throw new Error(`Error parsing then block ${this.context.src}`);
        }
        return this.context.copyWithSrc(src);
    }
}

Parser.registerRuleParser('then', ThenParser);

module.exports = ThenParser;
