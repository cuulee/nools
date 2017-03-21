'use strict';

const utils = require('../../util');

const GLOBAL_REG_EXP = /^global\s*/;
const REQUIRE_REG_EXP = /^require\(/;
const REQUIRE = 'require';
const REQUIRE_PREFIX = `${REQUIRE}('`;
const REQUIRE_SUFFIX = "')";

function global(orig, context) {
    let src = orig.replace(GLOBAL_REG_EXP, utils.EMPTY_STRING);
    let name = src.match(utils.IDENTIFIER_REG_EXP);
    if (name) {
        src = src
            .replace(name[0], utils.EMPTY_STRING)
            .trim();
        if (utils.findNextToken(src) === utils.EQ) {
            name = name[1].trim();
            const fullBody = utils.getTokensBetween(src, utils.EQ, utils.SEMICOLON, true)
                .join(utils.EMPTY_STRING);
            let body = fullBody.substring(1, fullBody.length - 1);
            body = body.trim();
            if (REQUIRE_REG_EXP.test(body)) {
                let file = utils.trimParens(utils.getParamList(body
                    .replace(REQUIRE, utils.EMPTY_STRING)))
                    .split(utils.COMMA);
                if (file.length === 1) {
                    // handle relative require calls
                    file = file[0].replace(utils.QUOTE_REG_EXP, utils.EMPTY_STRING);
                    const requireArgs = utils.resolve(context.file || process.cwd(), file);
                    body = [REQUIRE_PREFIX, requireArgs, REQUIRE_SUFFIX].join(utils.EMPTY_STRING);
                }
            }
            context.scope.push({name, body});
            src = src.replace(fullBody, utils.EMPTY_STRING);
            return src;
        }
        throw new Error(`unexpected token : expected : ${utils.EQ} found : '${utils.findNextToken(src)}'`);
    } else {
        throw new Error('missing name');
    }
}


module.exports = {
    global,
};