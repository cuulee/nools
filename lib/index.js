/**
 *
 * @projectName nools
 * @github https://github.com/C2FO/nools
 * @includeDoc [Examples] ../docs-md/examples.md
 * @includeDoc [Change Log] ../history.md
 * @header [../readme.md]
 */

"use strict";
var extd = require("./extended"),
    fs = require("fs"),
    path = require("path"),
    compile = require("./compile"),
    parser = require('./parser'),
    FlowContainer = require("./flowContainer");

function isNoolsFile(file) {
    return (/\.nools$/).test(file);
}

function parse(source) {
    if (isNoolsFile(source)) {
        return parser.parseRuleSet(fs.readFileSync(source, "utf8"), source);
    }
    return parser.parseRuleSet(source);
}

exports.Flow = FlowContainer;

exports.getFlow = FlowContainer.getFlow;
exports.hasFlow = FlowContainer.hasFlow;

exports.deleteFlow = function (name) {
    FlowContainer.deleteFlow(name);
    return this;
};

exports.deleteFlows = function () {
    FlowContainer.deleteFlows();
    return this;
};

exports.flow = FlowContainer.create;

exports.compile = function (file, options, cb) {
    if (extd.isFunction(options)) {
        cb = options;
        options = {};
    } else {
        options = options || {};
    }
    if (extd.isString(file)) {
        options.name = options.name || (isNoolsFile(file) ? path.basename(file, path.extname(file)) : null);
        file = parse(file);
    }
    if (!options.name) {
        throw new Error("Name required when compiling nools source");
    }
    return compile.compile(file, options, cb, FlowContainer);
};

exports.transpile = function (file, options) {
    options = options || {};
    if (extd.isString(file)) {
        options.name = options.name || (isNoolsFile(file) ? path.basename(file, path.extname(file)) : null);
        file = parse(file);
    }
    return compile.transpile(file, options);
};

exports.parse = parse;