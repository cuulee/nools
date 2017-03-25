'use strict';

const utils = require('./util');
const Parser = require('./parser');

const GLOBAL_REG_EXP = /^global\s*/;
const REQUIRE_REG_EXP = /^require\(/;
const REQUIRE = 'require';
const REQUIRE_PREFIX = `${REQUIRE}('`;
const REQUIRE_SUFFIX = "')";

class Scope {
    constructor(name, body) {
        this.name = name;
        this.body = body;
    }
}

class GlobalParser extends Parser {
    parse() {
        const context = this.context;
        let src = context.src.replace(GLOBAL_REG_EXP, utils.EMPTY_STRING);
        let name = src.match(utils.IDENTIFIER_REG_EXP);
        if (!name) {
            throw new Error(`"global" missing name in '${context.src}'`);
        }
        src = src.replace(name[0], utils.EMPTY_STRING).trim();
        if (utils.findNextToken(src) !== utils.EQ) {
            throw new Error(this.unexpectedTokenError(utils.EQ, src));
        }
        name = name[1].trim();
        const fullBody = utils.getTokensBetween(src, utils.EQ, utils.SEMICOLON, true)
            .join(utils.EMPTY_STRING);
        let body = fullBody.substring(1, fullBody.length - 1).trim();
        if (REQUIRE_REG_EXP.test(body)) {
            body = this.parseRequireBody(body);
        }
        context.scope.push(new Scope(name, body));
        src = src.replace(fullBody, utils.EMPTY_STRING);
        return context.copyWithSrc(src);
    }

    parseRequireBody(body) {
        const requireArgs = utils.getParamList(body.replace(REQUIRE, utils.EMPTY_STRING));
        const files = utils.trimParens(requireArgs).split(utils.COMMA);
        if (files.length !== 1) {
            throw new Error(`Requires can only contain one file found: ${requireArgs}`);
        }
        // handle relative require calls
        const file = utils.trimQuotes(files[0]);
        const requirePaths = utils.resolve(this.context.file || process.cwd(), file);
        return [REQUIRE_PREFIX, requirePaths, REQUIRE_SUFFIX].join(utils.EMPTY_STRING);
    }
}

Parser.registerTopLevelParser('global', GlobalParser);

module.exports = GlobalParser;
