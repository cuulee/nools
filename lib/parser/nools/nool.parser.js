'use strict';

const tokens = require('./tokens');
const utils = require('./util');

function parse(src, keywords, context) {
    const blockTypes = new RegExp(`^(${Object.keys(keywords).join('|')})`);
    let srcToParse = src.replace(/\/\/(.*)/g, '').replace(/\r\n|\r|\n/g, ' ');
    while (srcToParse) {
        const index = utils.findNextTokenIndex(srcToParse);
        if (index === -1) {
            break;
        }
        srcToParse = srcToParse.substr(index);
        let blockType = srcToParse.match(blockTypes);
        if (blockType !== null) {
            blockType = blockType[1];
            if (blockType in keywords) {
                try {
                    srcToParse = keywords[blockType](srcToParse, context, parse).replace(/^\s*|\s*$/g, '');
                } catch (e) {
                    throw new Error(`Invalid ${blockType} definition \n${e.message}; \nstarting at : ${src}`);
                }
            } else {
                throw new Error(`Unknown token${blockType}`);
            }
        } else {
            throw new Error(`Error parsing ${srcToParse}`);
        }
    }
}

module.exports = {
    parse(src, file){
        const context = {define: [], rules: [], scope: [], loaded: [], file};
        parse(src, tokens, context);
        return context;
    },
};

