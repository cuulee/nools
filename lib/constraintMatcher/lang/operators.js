'use strict';

function operators(parser) {
    return {
        prop(name, prop) {
            if (prop[2] === 'function') {
                return [parser(name), parser(prop)].join('.');
            }
            return [parser(name), "['", parser(prop), "']"].join('');
        },

        propLookup(name, prop) {
            if (prop[2] === 'function') {
                return [parser(name), parser(prop)].join('.');
            }
            return [parser(name), '[', parser(prop), ']'].join('');
        },

        unary(lhs) {
            return -1 * parser(lhs);
        },

        plus(lhs, rhs) {
            return [parser(lhs), '+', parser(rhs)].join(' ');
        },
        minus(lhs, rhs) {
            return [parser(lhs), '-', parser(rhs)].join(' ');
        },

        mult(lhs, rhs) {
            return [parser(lhs), '*', parser(rhs)].join(' ');
        },

        div(lhs, rhs) {
            return [parser(lhs), '/', parser(rhs)].join(' ');
        },

        mod(lhs, rhs) {
            return [parser(lhs), '%', parser(rhs)].join(' ');
        },

        lt(lhs, rhs) {
            return [parser(lhs), '<', parser(rhs)].join(' ');
        },
        gt(lhs, rhs) {
            return [parser(lhs), '>', parser(rhs)].join(' ');
        },
        lte(lhs, rhs) {
            return [parser(lhs), '<=', parser(rhs)].join(' ');
        },
        gte(lhs, rhs) {
            return [parser(lhs), '>=', parser(rhs)].join(' ');
        },
        like(lhs, rhs) {
            return [parser(rhs), '.test(', parser(lhs), ')'].join('');
        },
        notLike(lhs, rhs) {
            return ['!', parser(rhs), '.test(', parser(lhs), ')'].join('');
        },
        eq(lhs, rhs) {
            return [parser(lhs), '==', parser(rhs)].join(' ');
        },

        seq(lhs, rhs) {
            return [parser(lhs), '===', parser(rhs)].join(' ');
        },

        neq(lhs, rhs) {
            return [parser(lhs), '!=', parser(rhs)].join(' ');
        },

        sneq(lhs, rhs) {
            return [parser(lhs), '!==', parser(rhs)].join(' ');
        },

        in(lhs, rhs) {
            return ['(indexOf(', parser(rhs), ',', parser(lhs), ')) != -1'].join('');
        },

        notIn(lhs, rhs) {
            return ['(indexOf(', parser(rhs), ',', parser(lhs), ')) == -1'].join('');
        },

        logicalNot(lhs) {
            return ['!(', parser(lhs), ')'].join('');
        },
    };
};

module.exports = operators;
