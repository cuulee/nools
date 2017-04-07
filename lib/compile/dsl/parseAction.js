'use strict';

const modifiers = require('../common').modifiers;

function createVarsFragment(actionBody, identifiers, defined, scope) {
    /* eslint no-new-func:0 */
    const definedVars = [];
    const usedVars = {};

    const isValidVarName = varName => actionBody.indexOf(varName) !== -1 && !usedVars[varName];

    const createVarFrag = type => (varName) => {
        usedVars[varName] = true;
        definedVars.push(`var ${varName}= ${type}.${varName};`);
    };

    identifiers.filter(isValidVarName).forEach(createVarFrag('facts'));
    Object.keys(defined).filter(isValidVarName).forEach(createVarFrag('defined'));
    Object.keys(scope).filter(isValidVarName).forEach(createVarFrag('scope'));
    modifiers.filter(isValidVarName).forEach(createVarFrag('session'));
    return definedVars.join('');
}

function getParamsFragment(actionBody) {
    const params = ['facts', 'session'];
    if (/next\(.*\)/.test(actionBody)) {
        params.push('next');
    }
    return params.join(',');
}

/**
 * @private
 * Parses an action from a rule definition
 * @param {String} action the body of the action to execute
 * @param {Array} identifiers array of identifiers collected
 * @param {Object} defined an object of defined
 * @param scope
 * @return {Object}
 */
function parseAction(actionBody, identifiers, defined, scope) {
    const params = ['facts', 'session'];
    if (/next\(.*\)/.test(actionBody)) {
        params.push('next');
    }
    const varsFragment = createVarsFragment(actionBody, identifiers, defined, scope);
    const paramsFragment = getParamsFragment(actionBody);
    const functionBody = `
        return function(${paramsFragment}){
            ${varsFragment}
            ${actionBody}
        }`;
    try {
        return new Function('defined', 'scope', functionBody)(defined, scope);
    } catch (e) {
        throw new Error(`Invalid action : ${actionBody}\n${e.message}`);
    }
}

module.exports = parseAction;
