'use strict';

const RootParser = require('../rootParser');

const ruleParsers = Object.assign(
    exports,
    require('./agendaGroupParser'),
    require('./autoFocusParser'),
    require('./salienceParser'),
    require('./thenParser'),
    require('./whenParser'));

let loaded = false;

function initParsers() {
    if (!loaded) {
        /* eslint global-require: 0*/
        require('./agendaGroupParser');
        require('./autoFocusParser');
        require('./salienceParser');
        require('./thenParser');
        require('./whenParser');
        loaded = true;
    }
    return loaded;
}


class RootRuleParser extends RootParser {
    /**
     *
     * @param {String} src
     * @param {RuleContext} context
     */
    constructor(context) {
        initParsers();
        super(context, RootRuleParser.ruleParsers);
    }
}

module.exports = RootRuleParser;
