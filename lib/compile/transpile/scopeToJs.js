'use strict';

function scopeToJs(scopeDefinition, scope) {
    const name = scopeDefinition.name;
    scope[name] = {};
    return `var ${name} = scope.${name} = ${scopeDefinition.body};`;
}

module.exports = scopeToJs;
