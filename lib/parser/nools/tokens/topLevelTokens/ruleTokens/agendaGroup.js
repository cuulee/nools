'use strict';

const utils = require('../../../util');

const AGENDA_GROUP_REGEXP = /^(agenda-group|agendaGroup)\s*:\s*([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')\s*[,;]?/;
const QUOTE_REGEXP = /^["']|["']$/g;

function agendaGroup(src, context) {
    if (AGENDA_GROUP_REGEXP.test(src)) {
        const parts = src.match(AGENDA_GROUP_REGEXP);
        const ag = parts[2];
        if (ag) {
            Object.assign(context.options, {
                agendaGroup: ag.replace(QUOTE_REGEXP, utils.EMPTY_STRING),
            });
        } else {
            throw new Error(`Invalid agenda-group ${parts[2]}`);
        }
        return src.replace(parts[0], utils.EMPTY_STRING);
    }
    throw new Error('invalid format');
}

module.exports = {
    agendaGroup,
    'agenda-group': agendaGroup,
};
