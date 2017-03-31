'use strict';

const extd = require('../../extended');
const constraintsToJs = require('./constraintToJs');
const actionToJs = require('./actionToJs');

function createConstraintsFragment(constraints, identifiers) {
    if (!(constraints && !extd.isEmpty(constraints))) {
        return '';
    }
    return constraints.map(c => constraintsToJs(c, identifiers)).join(',');
}


function ruleToJs(rule, defined, scope) {
    const identifiers = [];
    const options = Object.assign(rule.options || {}, {scope: 'scope'});

    const optionsFragment = JSON.stringify(options).replace(/(:"scope")/, ':scope');
    const constraintsFragment = createConstraintsFragment(rule.constraints, identifiers);
    const actionFragment = actionToJs(rule.action, identifiers, defined, scope);
    return `builder.rule(
        '${rule.name.replace(/'/g, "\\'")}', 
        ${optionsFragment}, 
        [${constraintsFragment}], 
        ${actionFragment}
    );`;
}

module.exports = ruleToJs;
