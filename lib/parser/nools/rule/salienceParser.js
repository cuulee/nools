'use strict';

const utils = require('../util');
const Parser = require('../parser');

const SALIENCE_REGEXP = /^(salience|priority)\s*:\s*(-?\d+)\s*[,;]?/;

class SalienceParser extends Parser {
    parse() {
        const src = this.context.src;
        if (!SALIENCE_REGEXP.test(src)) {
            throw new Error(`Invalid salience format in source '${this.context.src}'`);
        }
        const parts = src.match(SALIENCE_REGEXP);
        const priority = parseInt(parts[2], 10);
        if (isNaN(priority)) {
            throw new Error(`Invalid salience/priority ${parts[2]}`);
        }
        this.context.options.priority = priority;
        return this.context.copyWithSrc(src.replace(parts[0], utils.EMPTY_STRING));
    }
}

Parser.registerRuleParser('salience', SalienceParser);
Parser.registerRuleParser('priority', SalienceParser);

module.exports = SalienceParser;
