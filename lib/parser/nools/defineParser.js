'use strict';

const utils = require('./util');
const Parser = require('./parser');

const DEFINE_REGEXP = /^define\s*/;

class Define {
    constructor(name, properties) {
        this.name = name;
        this.properties = properties;
    }
}

class DefineParser extends Parser {
    parse() {
        const context = this.context;
        let src = this.context.src.replace(DEFINE_REGEXP, utils.EMPTY_STRING);
        let name = src.match(utils.IDENTIFIER_REG_EXP);
        if (!name) {
            throw new Error(`"define" missing name in '${context.src}'`);
        }
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_CURLY) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_CURLY, src));
        }
        name = name[1].trim();
        const defineBody = utils
            .getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
            .join(utils.EMPTY_STRING);
        context.define.push(new Define(name, `(${defineBody})`));
        return context.copyWithSrc(src.replace(defineBody, utils.EMPTY_STRING));
    }
}

Parser.registerTopLevelParser('define', DefineParser);

module.exports = DefineParser;