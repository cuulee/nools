'use strict';
const composites = require('./composites');
const operators = require('./operators');
const terminals = require('./terminals');
const types = require('./types');

function lang(parser) {
    return Object.assign({},
        composites(parser),
        operators(parser),
        terminals(parser),
        types(parser));
}

module.exports = lang;