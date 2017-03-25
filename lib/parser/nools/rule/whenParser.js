'use strict';

const utils = require('../util');
const Parser = require('../parser');

const PREDICATES = ['not', 'or', 'exists'];
const PREDICATE_REG_EXP = new RegExp(`^(${PREDICATES.join('|')}) *\\((.*)\\)$`, 'm');
const PREDICATE_BEGIN_EXP = new RegExp(` *(${PREDICATES.join('|')}) *\\(`, 'g');
const RULE_REG_EXP = /^(\$?\w+) *: *(\w+)(.*)/;
const CONSTRAINT_REG_EXP = /(\{ *(?:["']?\$?\w+["']?\s*:\s*["']?\$?\w+["']? *(?:, *["']?\$?\w+["']?\s*:\s*["']?\$?\w+["']?)*)+ *\})/;
const FROM_REG_EXP = /(\bfrom\s+.*)/;
const TRAILING_COMMA_REG_EXP = /, *$/;
const OR = 'or';
const KEY_VALUE_REG_EXP = /(\$?\w+)\s*:\s*(\$?\w+)/g;
const KEY_VALUE_REPLACEMENT = '"$1" : "$2"';

class WhenParser extends Parser {

    parse() {
        const src = this.context.src.replace(/^when\s*/, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_CURLY) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_CURLY, src));
        }
        const body = utils.getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
            .join(utils.EMPTY_STRING);
        this.context.constraints = this.parseRules(utils.trimCurlies(body));
        return this.context.copyWithSrc(src.replace(body, utils.EMPTY_STRING));
    }

    // todo break this function up
    parseRules(str) {
        const rules = [];
        const ruleLines = str.split(utils.SEMICOLON);
        const l = ruleLines.length;
        for (let i = 0; i < l; i++) {
            let ruleLine = ruleLines[i].trim().replace(/\n/g, utils.EMPTY_STRING);
            if (!utils.isWhiteSpace(ruleLine)) {
                let rule = [];
                if (PREDICATE_REG_EXP.test(ruleLine)) {
                    const m = ruleLine.match(PREDICATE_REG_EXP);
                    const pred = m[1].trim();
                    rule.push(pred);
                    ruleLine = m[2].trim();
                    if (pred === OR) {
                        const split = this.splitPredicateExpression(ruleLine);
                        const orContraints = this.parseRules(split);
                        rule = rule.concat(orContraints);
                        rules.push(rule);
                        continue; // eslint-disable-line
                    }
                }
                const parts = ruleLine.match(RULE_REG_EXP);
                if (!(parts && parts.length)) {
                    throw new Error(`Invalid constraint '${ruleLine}' in source ${this.context.src}`);
                }
                rule.push(parts[2], parts[1]);
                let constraints = parts[3].trim();
                const hashParts = constraints.match(CONSTRAINT_REG_EXP);
                let from = null;
                if (hashParts) {
                    const hash = hashParts[1];
                    let constraint = constraints.replace(hash, utils.EMPTY_STRING);
                    if (FROM_REG_EXP.test(constraint)) {
                        const fromMatch = constraint.match(FROM_REG_EXP);
                        from = fromMatch[0];
                        constraint = constraint.replace(from, utils.EMPTY_STRING);
                    }
                    if (constraint) {
                        rule.push(constraint.trim());
                    }
                    if (hash) {
                        /* eslint no-eval: 0*/
                        rule.push(eval(`(${hash.replace(KEY_VALUE_REG_EXP, KEY_VALUE_REPLACEMENT)})`));
                    }
                } else if (constraints && !utils.isWhiteSpace(constraints)) {
                    if (FROM_REG_EXP.test(constraints)) {
                        const fromMatch = constraints.match(FROM_REG_EXP);
                        from = fromMatch[0];
                        constraints = constraints.replace(from, utils.EMPTY_STRING);
                    }
                    rule.push(constraints);
                }
                if (from) {
                    rule.push(from);
                }
                rules.push(rule);
            }
        }
        return rules;
    }


    stripTrailingComma(str) {
        return str.replace(TRAILING_COMMA_REG_EXP, utils.EMPTY_STRING);
    }

    splitPredicateExpression(ruleLine) {
        const str = ruleLine.replace(/,\s*(\$?\w+\s*:)/g, (m, s) => `; ${s}`);
        const parts = str.split(PREDICATE_BEGIN_EXP).filter((token) => {
            return token !== utils.EMPTY_STRING;
        });
        const l = parts.length;
        const ret = [];
        if (l) {
            for (let i = 0; i < l; i++) {
                if (PREDICATES.indexOf(parts[i]) !== -1) {
                    ret.push([parts[i], utils.LEFT_PAREN, this.stripTrailingComma(parts[i + 1])].join(''));
                    i += 1;
                } else {
                    ret.push(this.stripTrailingComma(parts[i]));
                }
            }
        } else {
            return str;
        }
        return ret.join(utils.SEMICOLON);
    }
}

Parser.registerRuleParser('when', WhenParser);

module.exports = WhenParser;
