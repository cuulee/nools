'use strict';

const extd = require('../../extended');
const helper = require('../helper');
const definedFunctions = require('../definedFunctions');
const parser = require('../parser');

let matcherCount = 0;
function toJs(rule, scope, alias, equality, wrap) {
    /* jshint evil:true*/
    const js = parser.parse(rule);
    const globalScope = scope || {};
    const vars = helper.getIdentifiers(rule);
    const closureVars = ['var indexOf = definedFuncs.indexOf; var hasOwnProperty = Object.prototype.hasOwnProperty;'];
    const funcVars = [];
    vars
        .filter((v) => {
            const ret = ['var ', v, ' = '];
            if (extd.has(definedFunctions, v)) {
                ret.push("definedFuncs['", v, "']");
            } else if (extd.has(globalScope, v)) {
                ret.push("scope['", v, "']");
            } else {
                return true;
            }
            ret.push(';');
            closureVars.push(ret.join(''));
            return false;
        })
        .forEach((v) => {
            const ret = ['var ', v, ' = '];
            if (equality || v !== alias) {
                ret.push(`fact.${v}`);
            } else if (v === alias) {
                ret.push('hash.', v, '');
            }
            ret.push(';');
            funcVars.push(ret.join(''));
        });
    const closureBody = `${closureVars.join('')}return function matcher${matcherCount}${!equality ? '(fact, hash){' : '(fact){'}${funcVars.join('')} return ${wrap ? wrap(js) : js};}`;
    const f = new Function('definedFuncs, scope', closureBody)(definedFunctions, globalScope); // eslint-disable-line
    matcherCount += 1;
    return f;
}

function getMatcher(rule, options, equality) {
    const opts = options || {};
    return toJs(rule, opts.scope, opts.alias, equality, (src) => {
        return `!!(${src})`;
    });
}

function getSourceMatcher(rule, options, equality) {
    const opts = options || {};
    return toJs(rule, opts.scope, opts.alias, equality, (src) => {
        return src;
    });
}

module.exports = {
    getMatcher,
    getSourceMatcher,
    toJs,
};