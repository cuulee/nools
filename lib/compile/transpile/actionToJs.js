'use strict';

const modifiers = require('../common').modifiers;

function createVarsFragment(actionBody, identifiers, defined, scope) {
    const declares = [];
    const usedVars = {};

    const isValidVarName = varName => actionBody.indexOf(varName) !== -1 && !usedVars[varName];

    const createVarFrag = type => (varName) => {
        usedVars[varName] = true;
        declares.push(`var ${varName}= ${type}.${varName};`);
    };

    identifiers.filter(isValidVarName).forEach(createVarFrag('facts'));
    Object.keys(defined).filter(isValidVarName).forEach(createVarFrag('defined'));
    Object.keys(scope).filter(isValidVarName).forEach(createVarFrag('scope'));
    modifiers.filter(isValidVarName).forEach(createVarFrag('session'));
    return declares.join('');
}


function actionToJs(action, identifiers, defined, scope) {
    const params = ['facts', 'session'];
    if (/next\(.*\)/.test(action)) {
        params.push('next');
    }
    return `function(${params.join(',')}){
        ${createVarsFragment(action, identifiers, defined, scope)}
        ${action}
    }`;
}

module.exports = actionToJs;
