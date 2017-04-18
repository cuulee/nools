'use strict';

const _ = require('lodash');
const parser = require('../../../../../parser');
const definedFunctions = require('./definedFunctions');

const DEFAULT_VARS = 'var indexOf = definedFuncs.indexOf; var hasOwnProperty = Object.prototype.hasOwnProperty;';

let matcherCount = 0;

function createVarStatements(vars, alias, scope, equality) {
    const closureVars = [DEFAULT_VARS];
    const functionVars = [];
    vars
        .filter((v) => {
            if (_.has(definedFunctions, v)) {
                closureVars.push(`var ${v} = definedFuncs['${v}'];`);
            } else if (_.has(scope, v)) {
                closureVars.push(`var ${v} = scope['${v}'];`);
            } else {
                return true;
            }
            return false;
        })
        .forEach((v) => {
            if (equality || v !== alias) {
                functionVars.push(`var ${v} = fact.${v};`);
            } else if (v === alias) {
                functionVars.push(`var ${v} = hash.${v};`);
            }
        });
    return {closureVars: closureVars.join(''), functionVars: functionVars.join('')};
}

function createMatcherFunction(constraint, alias, scope, equality, wrap) {
    /* eslint no-new-func:0*/
    const js = parser.constraint.parseConstraint(constraint);
    const globalScope = scope || {};

    const identifiers = parser.constraint.getIdentifiers(constraint);
    const varStatements = createVarStatements(identifiers, alias, globalScope, equality);
    const functionParams = !equality ? 'fact,  hash' : 'fact';

    const func = new Function('definedFuncs, scope', `
        ${varStatements.closureVars} 
        return function matcher${matcherCount}(${functionParams}){
            ${varStatements.functionVars} 
            return ${wrap ? wrap(js) : js};
        }
    `);

    matcherCount += 1;
    return func(definedFunctions, globalScope);
}

function createMatcher(constraint, alias, scope, equality) {
    return createMatcherFunction(constraint, alias, scope, equality, (src) => {
        return `!!(${src})`;
    });
}

function createSourceMatcher(constraint, alias, scope, equality) {
    return createMatcherFunction(constraint, alias, scope, equality, (src) => {
        return src;
    });
}

module.exports = {
    createMatcher,
    createSourceMatcher,
    createMatcherFunction,
};
