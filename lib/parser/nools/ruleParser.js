'use strict';

const utils = require('./util');
const Parser = require('./parser');
const RootRuleParser = require('./rule');

const RuleContext = require('./ruleContext');


const RULE_REG_EXP = /^rule\s*/;
const RULE_NAME_REG_EXP = /^([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')/;

class RuleParser extends Parser {

    parse() {
        let src = this.context.src.replace(RULE_REG_EXP, utils.EMPTY_STRING);
        let name = src.match(RULE_NAME_REG_EXP);
        if (!name) {
            throw new Error(`"rule" missing name in '${this.context.src}'`);
        }
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_CURLY) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_CURLY, src));
        }
        name = utils.trimQuotes(name[1]);
        const ruleSrc = utils
            .getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
            .join(utils.EMPTY_STRING);
        const ruleContext = new RuleContext(utils.trimCurlies(ruleSrc), name);
        this.context.rules.push(new RootRuleParser(ruleContext).parse());
        return this.context.copyWithSrc(src.replace(ruleSrc, utils.EMPTY_STRING));
    }
}

Parser.registerTopLevelParser('rule', RuleParser);

module.exports = RuleParser;
