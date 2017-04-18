'use strict';

const _ = require('lodash');
const moment = require('moment');

const DATE_INTERVALS = [
    'years',
    'days',
    'months',
    'hours',
    'minutes',
    'seconds',
];

const definedFuncs = {
    now() {
        return new Date();
    },

    Date(y, m, d, h, min, s, ms) {
        const date = new Date();
        if (_.isNumber(y)) {
            date.setYear(y);
        }
        if (_.isNumber(m)) {
            date.setMonth(m);
        }
        if (_.isNumber(d)) {
            date.setDate(d);
        }
        if (_.isNumber(h)) {
            date.setHours(h);
        }
        if (_.isNumber(min)) {
            date.setMinutes(min);
        }
        if (_.isNumber(s)) {
            date.setSeconds(s);
        }
        if (_.isNumber(ms)) {
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
        return dt1 - dt2;
    },

    isArray(value) {
        return Array.isArray(value);
    },

    isHash(value) {
        return _.isPlainObject(value);
    },

    indexOf(arr, element) {
        return arr.indexOf(element);
    },

    isDefined(value) {
        return !_.isUndefined(value);
    },

    isNumber(value) {
        return _.isNumber(value);
    },

    isObject(value) {
        return _.isObject(value);
    },

    isDate(value) {
        return _.isDate(value);
    },

    isBoolean(value) {
        return _.isBoolean(value);
    },

    isString(value) {
        return _.isString(value);
    },

    isRegExp(value) {
        return _.isRegExp(value);
    },

    isNull(value) {
        return _.isNull(value);
    },

    isEmpty(value) {
        return _.isEmpty(value);
    },

    isUndefined(value) {
        return _.isUndefined(value);
    },

    isUndefinedOrNull(value) {
        return _.isUndefined(value) || _.isNull(value);
    },

    isPromiseLike(value) {
        return _.isObject(value) && _.isFunction(value.then);
    },

    isFunction(value) {
        return _.isFunction(value);
    },

    deepEqual(value1, value2) {
        return _.isEqual(value1, value2);
    },
};

function addToNow(interval) {
    return increment => moment().add(increment, interval).toDate();
}

function subtractFromNow(interval) {
    return increment => moment().subtract(increment, interval).toDate();
}

DATE_INTERVALS.forEach((interval) => {
    definedFuncs[`${interval}FromNow`] = addToNow(interval);
    definedFuncs[`${interval}Ago`] = subtractFromNow(interval);
});

module.exports = definedFuncs;
