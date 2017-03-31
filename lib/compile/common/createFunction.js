'use strict';

function createFunction(body, defined, scope, scopeNames, definedNames) {
    /* eslint no-eval:0*/
    const declares = [];
    definedNames.forEach((name) => {
        if (body.indexOf(name) !== -1) {
            declares.push(`var ${name}= defined.${name};`);
        }
    });

    scopeNames.forEach((name) => {
        if (body.indexOf(name) !== -1) {
            declares.push(`var ${name}= scope.${name};`);
        }
    });
    const varsFragment = declares.join('');
    const functionDefinition = `
    ((function(){
        ${varsFragment}
        return ${body} 
    })())`;
    try {
        return eval(functionDefinition);
    } catch (e) {
        throw new Error(`Invalid action : ${body}\n${e.message}`);
    }
}

module.exports = createFunction;
