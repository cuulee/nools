'use strict';

const path = require('path');


const PATH_SEP = path.sep || (process.platform === 'win32' ? '\\' : '/');
const IDENTIFIER_REG_EXP = /^([a-zA-Z_$][0-9a-zA-Z_$]*)/;
const WHITE_SPACE_REG_EXP = /[\s|\n|\r|\t]/;
const ALL_WHITE_SPACE_REG_EXP = /[\s|\n|\r|\t]/g;
const LEFT_PAREN = '(';
const RIGHT_PAREN = ')';
const LEFT_CURLY = '{';
const RIGHT_CURLY = '}';
const LEFT_BRACKET = '[';
const RIGHT_BRACKET = ']';
const SLASH = '/';
const EMPTY_STRING = '';
const LEADING_AND_TRAILING_QUOTES_REG_EXP = /^["']|["']$/g;
const LEADING_AND_TRAILING_PARENS_REG_EXP = /[\(|\)]/g; // eslint-disable-line
const LEADING_AND_TRAILING_CURLIES_REG_EXP = /^\{\s*|\}\s*$/g;

const TOKEN_INVERTS = {
    '{': RIGHT_CURLY,
    '}': LEFT_CURLY,
    '(': RIGHT_PAREN,
    ')': LEFT_PAREN,
    '[': RIGHT_BRACKET,
};

function isWhiteSpace(str) {
    return str.replace(ALL_WHITE_SPACE_REG_EXP, EMPTY_STRING).length === 0;
}

function trimParens(str) {
    return str.replace(LEADING_AND_TRAILING_PARENS_REG_EXP, EMPTY_STRING);
}

function trimQuotes(str) {
    return str.replace(LEADING_AND_TRAILING_QUOTES_REG_EXP, EMPTY_STRING);
}

function trimCurlies(str) {
    return str.replace(LEADING_AND_TRAILING_CURLIES_REG_EXP, EMPTY_STRING);
}

function getTokensBetween(str, startToken, stopToken, includeStartEnd) {
    const tokens = [];
    let depth = 0;
    let start = startToken;
    if (!start) {
        start = TOKEN_INVERTS[stopToken];
        depth = 1;
    }
    const stop = stopToken || TOKEN_INVERTS[start];
    const src = Object(str);
    let cursor = 0;
    let found = false;
    let startPushing = false;
    while (src.charAt(cursor)) {
        const token = src.charAt(cursor);
        cursor += 1;
        if (token === start) {
            depth += 1;
            if (!startPushing) {
                startPushing = true;
                if (includeStartEnd) {
                    tokens.push(token);
                }
            } else {
                tokens.push(token);
            }
        } else if (token === stop && cursor) {
            depth -= 1;
            if (depth === 0) {
                if (includeStartEnd) {
                    tokens.push(token);
                }
                found = true;
                break;
            }
            tokens.push(token);
        } else if (startPushing) {
            tokens.push(token);
        }
    }
    if (!found) {
        throw new Error(`Expected to find token '${stop}' in source '${src}'`);
    }
    return tokens;
}

function getParamList(str) {
    return getTokensBetween(str, LEFT_PAREN, RIGHT_PAREN, true).join('');
}

function resolve(from, to) {
    let cleansedTo = to;
    if (process.platform === 'win32') {
        cleansedTo = to.replace(/\//g, '\\');
    }
    let cleansedFrom = from;
    if (path.extname(from) !== EMPTY_STRING) {
        cleansedFrom = path.dirname(from);
    }
    if (cleansedTo.split(PATH_SEP).length === 1) {
        return cleansedTo;
    }
    return path.resolve(cleansedFrom, cleansedTo).replace(/\\/g, SLASH);
}

function findNextTokenIndex(str, startIndex, endIndex) {
    const l = str.length;
    let end = endIndex;
    if (!end || end > l) {
        end = l;
    }
    let ret = -1;
    for (let i = startIndex || 0; i < end; i++) {
        const c = str.charAt(i);
        if (!WHITE_SPACE_REG_EXP.test(c)) {
            ret = i;
            break;
        }
    }
    return ret;
}

function findNextToken(str, startIndex, endIndex) {
    return str.charAt(findNextTokenIndex(str, startIndex, endIndex));
}

module.exports = {
    getTokensBetween,
    getParamList,
    isWhiteSpace,
    resolve,
    findNextTokenIndex,
    findNextToken,
    trimParens,
    trimQuotes,
    trimCurlies,
    IDENTIFIER_REG_EXP,
    LEFT_PAREN,
    RIGHT_PAREN,
    LEFT_CURLY,
    RIGHT_CURLY,
    LEFT_BRACKET,
    RIGHT_BRACKET,
    EMPTY_STRING,
    SLASH,
    EQ: '=',
    SEMICOLON: ';',
    COMMA: ',',
};
