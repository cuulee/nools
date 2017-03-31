'use strict';

const createFunction = require('./createFunction');
const createDefined = require('./createDefined');

const modifiers = ['assert', 'modify', 'retract', 'emit', 'halt', 'focus', 'getFacts'];

module.exports = {
    createFunction,
    createDefined,
    modifiers,
};
