'use strict';

const utils = require('./util');
const Parser = require('./parser');

const FUNCTION_REGEXP = /^function\s*/;
const FUNCTION_PREFIX = 'function';

class Func {
    constructor(name, body) {
        this.name = name;
        this.body = body;
    }
}

class FunctionParser extends Parser {
    parse() {
        const context = this.context;
        let src = context.src.replace(FUNCTION_REGEXP, utils.EMPTY_STRING);
        // parse the function name
        let name = src.match(utils.IDENTIFIER_REG_EXP);
        if (!name) {
            throw new Error(`"function" missing name in '${context.src}'`);
        }
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_PAREN) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_PAREN, src));
        }
        name = name[1];
        const params = utils.getParamList(src);
        src = src.replace(params, utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.LEFT_CURLY) {
            throw new Error(this.unexpectedTokenError(utils.LEFT_CURLY, src));
        }
        const functionBody = utils
            .getTokensBetween(src, utils.LEFT_CURLY, utils.RIGHT_CURLY, true)
            .join(utils.EMPTY_STRING);
        context.scope.push(new Func(name, `${FUNCTION_PREFIX}${params}${functionBody}`));
        return context.copyWithSrc(src.replace(functionBody, utils.EMPTY_STRING));
    }
}

Parser.registerTopLevelParser('function', FunctionParser);

module.exports = FunctionParser;
