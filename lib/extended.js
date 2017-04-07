'use strict';

const pSlice = Array.prototype.slice;
const pSplice = Array.prototype.splice;

function plucked(prop) {
    const exec = prop.match(/(\w+)\(\)$/);
    if (exec) {
        const functionName = exec[1];
        return (item) => {
            return item[functionName]();
        };
    }
    return (item) => {
        return item[prop];
    };
}

function plucker(prop) {
    const properties = prop.split('.');
    if (properties.length === 1) {
        return plucked(properties[0]);
    }
    const pluckers = properties.map(property => plucked(property));
    return item => pluckers.reduce((res, pluck) => pluck(res), item);
}

function intersection(a, b) {
    const aCopy = pSlice.call(a);

    let l = aCopy.length;
    let i = 0;
    while (i < l) {
        if (b.indexOf(aCopy[i]) === -1) {
            pSplice.call(aCopy, i, 1);
            l -= 1;
        } else {
            i += 1;
        }
    }
    return aCopy;
}

module.exports = require('extended')()
    .register(require('date-extended'))
    .register(require('array-extended'))
    .register(require('object-extended'))
    .register(require('string-extended'))
    .register(require('promise-extended'))
    .register(require('function-extended'))
    .register(require('is-extended'))
    .register('intersection', intersection)
    .register('plucker', plucker)
    .register('HashTable', require('ht'))
    .register('declare', require('declare.js'))
    .register(require('leafy'));

