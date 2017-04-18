'use strict';

const _ = require('lodash');

const DEFAULT_CONSTRUCTOR_FRAGMENT = 'var Defined = function(opts){ for(var i in opts){if(opts.hasOwnProperty(i)){this[i] = opts[i];}}};';

function createDefinedConstructorFragment(Defined) {
    if (_.has(Defined, 'constructor') && _.isFunction(Defined.constructor)) {
        return `var Defined = ${Defined.constructor.toString()};`;
    }
    return DEFAULT_CONSTRUCTOR_FRAGMENT;
}

function createDefinedProto(properties) {
    return Object.keys(properties).map((key) => {
        const value = properties[key];
        const valueFragment = _.isFunction(value) ? value.toString() : JSON.stringify(value);
        return `proto.${key} = ${valueFragment};`;
    }).join('');
}

function createDefinedConstructor(properties) {
    /* eslint no-new-func:0*/
    if (_.isString(properties)) {
        return new Function(`return ${properties};`)();
    }
    return properties;
}

function definedToJs(definedDefinition, defined) {
    const name = definedDefinition.name;
    const properties = definedDefinition.properties;
    defined[name] = {};
    const Defined = createDefinedConstructor(properties);
    const definedFunctionFrag = `(function(){
        ${createDefinedConstructorFragment(Defined)} 
        var proto = Defined.prototype; 
        ${createDefinedProto(Defined)}
        return Defined;
    }())`;
    return `var ${name} = defined.${name} = builder.addDefined('${name}', ${definedFunctionFrag});`;
}

module.exports = definedToJs;

