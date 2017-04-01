'use strict';

const utils = require('./util');

const topLevelParsers = {};
const ruleParsers = {};

class Parser {
    /**
     * @param {Context} context the context of the parser
     */
    constructor(context) {
        this.context = context;
    }

    parse() {
        return this.context;
    }

    unexpectedTokenError(expected, src) {
        return `Unexpected token. Expected '${expected}' found '${utils.findNextToken(src)}' in source '${this.context.src}'`;
    }

    static registerTopLevelParser(name, TopLevelParser) {
        if (name in topLevelParsers) {
            throw new Error(`A top level parser for ${name} is already defined ${topLevelParsers[name]}`);
        }
        topLevelParsers[name] = context => new TopLevelParser(context).parse();
    }

    static registerRuleParser(name, RuleParser) {
        if (name in ruleParsers) {
            throw new Error(`A rule level parser for ${name} is already defined ${ruleParsers[name]}`);
        }
        ruleParsers[name] = context => new RuleParser(context).parse();
    }

    static get topLevelParsers() {
        return topLevelParsers;
    }

    static get ruleParsers() {
        return ruleParsers;
    }
}

module.exports = Parser;
