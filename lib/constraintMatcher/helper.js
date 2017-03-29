'use strict';

const extd = require('../extended');
const parser = require('./parser');

const removeDups = extd.removeDuplicates;

function getProps(obj) {
    return extd(obj)
        .map((val) => {
            if (Array.isArray(val)) {
                if (Array.isArray(val[0])) {
                    return getProps(val);
                }
                return val.reverse().join('.');
            }
            return val;
        }).flatten()
        .filter(v => !!v);
}

function equal(c1, c2) {
    let ret = false;
    if (c1 === c2) {
        ret = true;
    } else if (c1[2] === c2[2]) {
        if (['string', 'number', 'boolean', 'regexp', 'identifier', 'null'].indexOf(c1[2]) !== -1) {
            ret = c1[0] === c2[0];
        } else if (c1[2] === 'unary' || c1[2] === 'logicalNot') {
            ret = equal(c1[0], c2[0]);
        } else {
            ret = equal(c1[0], c2[0]) && equal(c1[1], c2[1]);
        }
    }
    return ret;
}

function getProperties(rule) {
    let ret = [];
    if (rule) {
        const rule2 = rule[2];
        if (!rule2) {
            return ret;
        }
        if (rule2 !== 'prop' &&
            rule2 !== 'identifier' &&
            rule2 !== 'string' &&
            rule2 !== 'number' &&
            rule2 !== 'boolean' &&
            rule2 !== 'regexp' &&
            rule2 !== 'unary' &&
            rule2 !== 'unary') {
            ret[0] = getProperties(rule[0]);
            ret[1] = getProperties(rule[1]);
        } else if (rule2 === 'identifier') {
            // at the bottom
            ret = [rule[0]];
        } else {
            ret = getProperties(rule[1]).concat(getProperties(rule[0]));
        }
    }
    return ret;
}

function getIndexableProperties(rule) {
    if (rule[2] === 'composite') {
        return getIndexableProperties(rule[0]);
    } else if (/^(\w+(\['[^']*'])*) *([!=]==?|[<>]=?) (\w+(\['[^']*'])*)$/.test(parser.parse(rule))) {
        return getProps(getProperties(rule)).flatten().value();
    }
    return [];
}

function getIdentifiers(rule) {
    let ret = [];
    const rule2 = rule[2];

    if (rule2 === 'identifier') {
        // its an identifier so stop
        return [rule[0]];
    } else if (rule2 === 'function') {
        ret = ret.concat(getIdentifiers(rule[0])).concat(getIdentifiers(rule[1]));
    } else if (rule2 !== 'string' &&
        rule2 !== 'number' &&
        rule2 !== 'boolean' &&
        rule2 !== 'regexp' &&
        rule2 !== 'unary' &&
        rule2 !== 'unary') {
        // its an expression so keep going
        if (rule2 === 'prop') {
            ret = ret.concat(getIdentifiers(rule[0]));
            if (rule[1]) {
                let propChain = rule[1];
                // go through the member variables and collect any identifiers that
                // may be in functions
                while (Array.isArray(propChain)) {
                    if (propChain[2] === 'function') {
                        ret = ret.concat(getIdentifiers(propChain[1]));
                        break;
                    } else {
                        propChain = propChain[1];
                    }
                }
            }
        } else {
            if (rule[0]) {
                ret = ret.concat(getIdentifiers(rule[0]));
            }
            if (rule[1]) {
                ret = ret.concat(getIdentifiers(rule[1]));
            }
        }
    }
    // remove dups and return
    return removeDups(ret);
}

module.exports = {
    equal,
    getIdentifiers,
    getIndexableProperties,
    getProperties,
};
