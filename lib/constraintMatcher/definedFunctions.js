'use strict';

const extd = require('../extended');

const isNumber = extd.isNumber;

const definedFuncs = {
    now() {
        return new Date();
    },

    Date(y, m, d, h, min, s, ms) {
        const date = new Date();
        if (isNumber(y)) {
            date.setYear(y);
        }
        if (isNumber(m)) {
            date.setMonth(m);
        }
        if (isNumber(d)) {
            date.setDate(d);
        }
        if (isNumber(h)) {
            date.setHours(h);
        }
        if (isNumber(min)) {
            date.setMinutes(min);
        }
        if (isNumber(s)) {
            date.setSeconds(s);
        }
        if (isNumber(ms)) {
            date.setMilliseconds(ms);
        }
        return date;
    },

    lengthOf(arr, length) {
        return arr.length === length;
    },

    isTrue(val) {
        return val === true;
    },

    isFalse(val) {
        return val === false;
    },

    isNotNull(actual) {
        return actual !== null;
    },

    dateCmp(dt1, dt2) {
        return extd.compare(dt1, dt2);
    },

};

['years', 'days', 'months', 'hours', 'minutes', 'seconds'].forEach((k) => {
    definedFuncs[`${k}FromNow`] = extd[`${k}FromNow`];
    definedFuncs[`${k}Ago`] = extd[`${k}Ago`];
});


['isArray', 'isNumber', 'isHash', 'isObject', 'isDate', 'isBoolean', 'isString', 'isRegExp', 'isNull', 'isEmpty',
    'isUndefined', 'isDefined', 'isUndefinedOrNull', 'isPromiseLike', 'isFunction', 'deepEqual', 'indexOf']
    .forEach((k) => {
        definedFuncs[k] = extd[k].bind(extd);
    });

module.exports = definedFuncs;
