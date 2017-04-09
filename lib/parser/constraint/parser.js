'use strict';

const languageDefinition = require('./lang');

const lang = languageDefinition((rule) => {
    return lang[rule[2]](rule[0], rule[1]);
});

function parse(rule) {
    if (!(rule[2] in lang)) {
        throw new Error(`Unsupported language feature ${rule[2]}`);
    }
    return lang[rule[2]](rule[0], rule[1]);
}

module.exports = parse;
