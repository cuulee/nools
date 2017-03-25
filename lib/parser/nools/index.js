'use strict';

const RootParser = require('./rootParser');
const ParserContext = require('./parserContext');


module.exports = {
    parse(src, file){
        return new RootParser(new ParserContext(src, file)).parse();
    },
};