'use strict';

const Parser = require('./parser');
const utils = require('./util');

let loaded = false;

function initParsers() {
    if (!loaded) {
        /* eslint global-require: 0*/
        require('./commentParser');
        require('./defineParser');
        require('./functionParser');
        require('./globalParser');
        require('./importParser');
        require('./ruleParser');
        loaded = true;
    }
    return loaded;
}

class RootParser extends Parser {

    constructor(context, parsers) {
        super(context);
        initParsers();
        this.parsers = parsers || Parser.topLevelParsers;
        this.blockTypes = new RegExp(`^(${Object.keys(this.parsers).join('|')})`);
    }

    parse() {
        let context = this.context.copyWithSrc(this.context.src.replace(/\/\/(.*)/g, '').replace(/\r\n|\r|\n/g, ' '));
        while (context.src) {
            const index = utils.findNextTokenIndex(context.src);
            if (index === -1) {
                break;
            }
            context = context.copyWithSrc(context.src.substr(index));
            let blockType = context.src.match(this.blockTypes);
            if (blockType !== null) {
                blockType = blockType[1];
                if (blockType in this.parsers) {
                    try {
                        context = this.parsers[blockType](context);
                    } catch (e) {
                        throw new Error(`Invalid ${blockType} definition \n${e.message}; \nstarting at : ${context.src}`);
                    }
                } else {
                    throw new Error(`Unknown token: ${blockType}`);
                }
            } else {
                throw new Error(`Error parsing ${context.src}`);
            }
        }
        this.context = context;
        return this.context;
    }
}

module.exports = RootParser;
