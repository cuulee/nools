'use strict';

const utils = require('../util');
const Parser = require('../parser');

const AGENDA_GROUP_REGEXP = /^(agenda-group|agendaGroup)\s*:\s*([a-zA-Z_$][0-9a-zA-Z_$]*|"[^"]*"|'[^']*')\s*[,;]?/;

class AgendaGroupParser extends Parser {
    parse() {
        const context = this.context;
        const src = this.context.src;
        if (!AGENDA_GROUP_REGEXP.test(src)) {
            throw new Error(`Invalid agenda-group format in source '${this.context.src}'`);
        }
        const parts = src.match(AGENDA_GROUP_REGEXP);
        const agendaGroup = parts[2];
        if (!agendaGroup) {
            throw new Error(`Invalid agenda-group ${parts[2]} in ${this.context.src}`);
        }
        context.options.agendaGroup = utils.trimQuotes(agendaGroup);
        return context.copyWithSrc(src.replace(parts[0], utils.EMPTY_STRING));
    }
}

Parser.registerRuleParser('agendaGroup', AgendaGroupParser);
Parser.registerRuleParser('agenda-group', AgendaGroupParser);

module.exports = AgendaGroupParser;
