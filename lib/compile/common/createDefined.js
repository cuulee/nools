'use strict';

/* eslint no-new-func:0 */

const extended = require('../../extended');

const isString = extended.isString;

function createConstructor(properties, defined, scope) {
    if (!isString(properties)) {
        return properties;
    }
    const declares = [];
    Object.keys(defined).forEach((i) => {
        if (properties.indexOf(i) !== -1) {
            declares.push(`var ${i}= defined.${i};`);
        }
    });

    Object.keys(scope).forEach((i) => {
        if (properties.indexOf(i) !== -1) {
            declares.push(`var ${i}= function(){var prop = scope.${i}; return __objToStr__.call(prop) === '[object Function]' ? prop.apply(void 0, arguments) : prop;};`);
        }
    });

    if (declares.length) {
        declares.unshift('var __objToStr__ = Object.prototype.toString;');
    }
    const functionBody = `${declares.join('')} return ${properties};`;
    return new Function('defined', 'scope', functionBody)(defined, scope);
}

function createDefaultConstructor(properties) {
    return function Defined(options) {
        const opts = options || {};
        Object.keys(opts).forEach((key) => {
            if (key in properties) {
                this[key] = opts[key];
            }
        });
    };
}

function createDefined(options, defined, scope) {
    const properties = options.properties;
    const Defined = createConstructor(properties, defined, scope);
    let definedConstructor = null;
    if (extended.has(Defined, 'constructor') && extended.isFunction(Defined.constructor)) {
        definedConstructor = Defined.constructor;
    } else {
        definedConstructor = createDefaultConstructor(Defined);
    }
    const proto = definedConstructor.prototype;
    Object.assign(proto, Defined);
    return definedConstructor;
}

module.exports = createDefined;
